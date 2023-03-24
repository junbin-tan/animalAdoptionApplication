/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Donation;
import entity.Member;
import entity.Testimonial;
import exception.InputDataValidationException;
import exception.UnknownPersistenceException;
import java.util.List;
import java.util.Set;
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
 * @author alwin
 */
@Stateless
public class DonationSessionBean implements DonationSessionBeanLocal {

	@PersistenceContext(unitName = "AnimalAdoptionApplication-ejbPU")
	private EntityManager entityManager;

	private final ValidatorFactory validatorFactory;
    private final Validator validator;
    
    
    
    public DonationSessionBean() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

	@Override
    public Long createNewDonation(Donation newDonation) throws UnknownPersistenceException, InputDataValidationException {
        Set<ConstraintViolation<Donation>>constraintViolations = validator.validate(newDonation);
        
        if(constraintViolations.isEmpty()) {
            try {
                entityManager.persist(newDonation);
                entityManager.flush();

                return newDonation.getDonationId();
            }
            catch(PersistenceException ex)
            {
                if(ex.getCause() != null && ex.getCause().getClass().getName().equals("org.eclipse.persistence.exceptions.DatabaseException")) {
                    if(ex.getCause().getCause() != null && ex.getCause().getCause().getClass().getName().equals("java.sql.SQLIntegrityConstraintViolationException"))
                    {
                        throw new UnknownPersistenceException(ex.getMessage());
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
    public Long createNewTestimonial(Testimonial newTestimonial) throws UnknownPersistenceException, InputDataValidationException {
        Set<ConstraintViolation<Testimonial>>constraintViolations = validator.validate(newTestimonial);
        
        if(constraintViolations.isEmpty()) {
            try {
                entityManager.persist(newTestimonial);
                entityManager.flush();

                return newTestimonial.getTestimonialId();
            }
            catch(PersistenceException ex)
            {
                if(ex.getCause() != null && ex.getCause().getClass().getName().equals("org.eclipse.persistence.exceptions.DatabaseException")) {
                    if(ex.getCause().getCause() != null && ex.getCause().getCause().getClass().getName().equals("java.sql.SQLIntegrityConstraintViolationException"))
                    {
                        throw new UnknownPersistenceException(ex.getMessage());
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
            throw new InputDataValidationException(prepareInputDataValidationErrorsMessageForTestimonial(constraintViolations));
        }
    }

    public long setDonationToTestimonial(Long donationId, Long testId) {
            Donation d = entityManager.find(Donation.class, donationId);
            Testimonial test = entityManager.find(Testimonial.class, testId);
            test.setDonation(d);
            entityManager.flush();
            return test.getTestimonialId();
    }

    public void setTestimonialToDonation(Long donationId, Long testId) {
            Donation d = entityManager.find(Donation.class, donationId);
            Testimonial test = entityManager.find(Testimonial.class, testId);
            d.setTestimonial(test);
            entityManager.flush();
    }


	 private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<Donation>>constraintViolations) {
        String msg = "Input data validation error!:";
            
        for(ConstraintViolation constraintViolation:constraintViolations)
        {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        
        return msg;
    }
	 
	 private String prepareInputDataValidationErrorsMessageForTestimonial(Set<ConstraintViolation<Testimonial>>constraintViolations) {
        String msg = "Input data validation error!:";
            
        for(ConstraintViolation constraintViolation:constraintViolations)
        {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        
        return msg;
    }

	public void persist(Object object) {
		entityManager.persist(object);
	}

	public List<Member> getMemberByEmail(String email) {
		Query query = entityManager.createQuery("SELECT m FROM Member m WHERE m.email = :inEmail");
		query.setParameter("inEmail", email);

        return query.getResultList();
	}

	
	

}
