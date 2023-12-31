/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.AnimalListing;
import entity.Member;
import exception.AnimalListingHasApplicationFormException;
import exception.DeleteAnimalListingException;
import exception.InputDataValidationException;
import exception.ListingExistException;
import exception.ListingNotFoundException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.TimeZone;
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
 * @author Jun Bin
 */
@Stateless
public class AnimalListingSessionBean implements AnimalListingSessionBeanLocal {

    @EJB(name = "MemberSessionBeanLocal")
    private MemberSessionBeanLocal memberSessionBeanLocal;

    @PersistenceContext(unitName = "AnimalAdoptionApplication-ejbPU")
    private EntityManager em;

    
    
    
    private final ValidatorFactory validatorFactory;
    private final Validator validator;

    public AnimalListingSessionBean() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    
    @Override
    public Long createAnimalListing(AnimalListing newListing) throws ListingExistException, UnknownPersistenceException, InputDataValidationException, MemberNotFoundException
    {
        Set<ConstraintViolation<AnimalListing>>constraintViolations = validator.validate(newListing);
        Member thisMember = memberSessionBeanLocal.retrieveMemberByMemberId(newListing.getMember().getMemberId());
        
        if(constraintViolations.isEmpty())
        {
            try
            {
                //association
                thisMember.getAnimalListings().add(newListing);                
                newListing.setMember(thisMember);
                
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm", Locale.ENGLISH);
                TimeZone tz = TimeZone.getTimeZone("Asia/Singapore");
                sdf.setTimeZone(tz);
                java.util.Date date = new java.util.Date();
                newListing.setCreateDate(date);
                
                em.persist(newListing);
                em.flush();

                return newListing.getAnimalListingId();
            }
            catch(PersistenceException ex)
            {
                if(ex.getCause() != null && ex.getCause().getClass().getName().equals("org.eclipse.persistence.exceptions.DatabaseException"))
                {
                    if(ex.getCause().getCause() != null && ex.getCause().getCause().getClass().getName().equals("java.sql.SQLIntegrityConstraintViolationException"))
                    {
                        throw new ListingExistException();
                    }
                    else
                    {
                        throw new UnknownPersistenceException(ex.getMessage());
                    }
                }
                else
                {
                    throw new UnknownPersistenceException(ex.getMessage());
                }
            }
        }
        else
        {
            throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
        }
    }
    
    
    @Override
    public List<AnimalListing> retrieveAllAnimalListings()
    {
        Query query = em.createQuery("SELECT l FROM AnimalListing l ORDER BY l.animalListingId DESC");
        
        return query.getResultList();
    }
    
    @Override
    public List<AnimalListing> retrieveAnimalListingByMemberEmail(String emailAddress)
    {
        Query query = em.createQuery("SELECT l FROM AnimalListing l WHERE l.member.email = :emailAddress");
        
        query.setParameter("emailAddress", emailAddress);
        
        List<AnimalListing> animalListings = query.getResultList();
        for (AnimalListing al : animalListings) {
            al.getApplicationForms().size(); // lazy loading to get application forms for each animal listing
        }
        
        return query.getResultList();
    }
    
    
    @Override
    public AnimalListing retrieveAnimalListingByAnimalListingId(Long id) throws ListingNotFoundException
    {
        AnimalListing al = em.find(AnimalListing.class, id);
        
        if(al != null)
        {
            return al;
        }
        else
        {
            throw new ListingNotFoundException("Animal Listing ID " + id + " does not exist!");
        }               
    }
    
     public void deleteAnimalListing(Long id) throws ListingNotFoundException, DeleteAnimalListingException, MemberNotFoundException, AnimalListingHasApplicationFormException
    {
        AnimalListing toRemove = retrieveAnimalListingByAnimalListingId(id);
        if (toRemove.getApplicationForms().size() == 0) {
            Member thisMember = memberSessionBeanLocal.retrieveMemberByMemberId(toRemove.getMember().getMemberId());
            //Does not remove all the application form JUST FYI
            thisMember.getAnimalListings().remove(toRemove);
            em.remove(toRemove);
        
        } else {
            throw new AnimalListingHasApplicationFormException("Animal listing has application forms associated to it and cannot be deleted!");
        }
        
       
    }
    
    
    
    
    private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<AnimalListing>> constraintViolations) {
        String msg = "Input data validation error!:";

        for (ConstraintViolation constraintViolation : constraintViolations) {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        return msg;
    }

    public void persist(Object object) {
        em.persist(object);
    }

    public void persist1(Object object) {
        em.persist(object);
    }

}
