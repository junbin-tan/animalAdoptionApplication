/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.AnimalListing;
import entity.ApplicationForm;
import entity.Member;
import exception.ApplicationFormExistException;
import exception.ApplicationNotFoundException;
import exception.DeleteApplicationFormException;
import exception.InputDataValidationException;
import exception.ListingNotFoundException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
import exception.UpdateApplicationFormException;
import java.util.List;
import java.util.Set;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

/**
 *
 * @author jiawe
 */
@Stateless
public class ApplicationFormSessionBean implements ApplicationFormSessionBeanLocal {

    @EJB(name = "AnimalListingSessionBeanLocal")
    private AnimalListingSessionBeanLocal animalListingSessionBeanLocal;

    @EJB(name = "MemberSessionBeanLocal")
    private MemberSessionBeanLocal memberSessionBeanLocal;

    @PersistenceContext(unitName = "AnimalAdoptionApplication-ejbPU")
    private EntityManager em;

    private final ValidatorFactory validatorFactory;
    private final Validator validator;

    public ApplicationFormSessionBean() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    public Long createNewApplication(ApplicationForm newAppForm, Member member, AnimalListing animalListing) throws UnknownPersistenceException, InputDataValidationException, MemberNotFoundException, ListingNotFoundException, ApplicationFormExistException {
        Set<ConstraintViolation<ApplicationForm>> constraintViolations = validator.validate(newAppForm);
        if (constraintViolations.isEmpty()) {
            try {

                Member managedMember = memberSessionBeanLocal.retrieveMemberByMemberId(member.getMemberId());
                AnimalListing managedAnimalListing = animalListingSessionBeanLocal.retrieveAnimalListingByAnimalListingId(animalListing.getAnimalListingId());

                newAppForm.setMember(managedMember);
                managedMember.getApplicationForms().add(newAppForm);

                newAppForm.setAnimalListing(managedAnimalListing);
                managedAnimalListing.getApplicationForms().add(newAppForm);

                em.persist(newAppForm);
                em.flush();

                return newAppForm.getApplicationFormId();
            } catch (PersistenceException ex) {
                if (ex.getCause() != null && ex.getCause().getClass().getName().equals("org.eclipse.persistence.exceptions.DatabaseException")) {
                    if (ex.getCause().getCause() != null && ex.getCause().getCause().getClass().getName().equals("java.sql.SQLIntegrityConstraintViolationException")) {
                        throw new ApplicationFormExistException();
                    } else {
                        throw new UnknownPersistenceException(ex.getMessage());
                    }
                } else {
                    throw new UnknownPersistenceException(ex.getMessage());
                }
            }
        } else {
            throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
        }
    }

    @Override
    public List<ApplicationForm> retrieveAllApplicationForms() {
        Query query = em.createQuery("SELECT a FROM ApplicationForm a ORDER BY a.applicationFormId ASC");

        return query.getResultList();
    }
    
    @Override
    public List<ApplicationForm> retrieveApplicationFormsByMemberEmail(String emailAddress) {
        Query query = em.createQuery("SELECT a FROM ApplicationForm a WHERE a.member.email = :emailAddress");
        query.setParameter("emailAddress", emailAddress);
        return query.getResultList();
    }

    @Override
    public ApplicationForm retrieveApplicationFormById(Long appFormId) throws ApplicationNotFoundException {
        ApplicationForm appForm = em.find(ApplicationForm.class, appFormId);

        if (appForm != null) {
            return appForm;
        } else {
            throw new ApplicationNotFoundException("Application Form ID " + appFormId + " not found!");
        }
    }

    @Override
    public void updateApplicationForm(ApplicationForm appForm) throws ApplicationNotFoundException, UpdateApplicationFormException, InputDataValidationException {
        if (appForm != null && appForm.getApplicationFormId() != null) {
            Set<ConstraintViolation<ApplicationForm>> constraintViolations = validator.validate(appForm);

            if (constraintViolations.isEmpty()) {
                ApplicationForm appFormToUpdate = retrieveApplicationFormById(appForm.getApplicationFormId());

                if (appFormToUpdate.getApplicationFormId().equals(appForm.getApplicationFormId())) {
                    appFormToUpdate.setApplicationStatus(appForm.getApplicationStatus());
                } else {
                    throw new UpdateApplicationFormException("Id of Application form record to be updated does not match the existing record");
                }
            } else {
                throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
            }
        } else {
            throw new ApplicationNotFoundException("Application Form ID not provided for application form to be updated");
        }
    }

    @Override
    public void deleteApplicationForm(Long appFormId) throws ApplicationNotFoundException {
        ApplicationForm appFormToRemove = retrieveApplicationFormById(appFormId);
        Member member = appFormToRemove.getMember();
        AnimalListing animalListing = appFormToRemove.getAnimalListing();

//        appFormToRemove.setMember(null);
        member.getApplicationForms().remove(appFormToRemove);
        
//        appFormToRemove.setAnimalListing(null);
        animalListing.getApplicationForms().remove(appFormToRemove);

        em.remove(appFormToRemove);

    }

    private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<ApplicationForm>> constraintViolations) {
        String msg = "Input data validation error!:";

        for (ConstraintViolation constraintViolation : constraintViolations) {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }

        return msg;
    }
}
