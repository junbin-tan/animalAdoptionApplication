/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Donation;
import entity.Enquiry;
import entity.Testimonial;
import exception.InputDataValidationException;
import exception.TestimonialNotFoundException;
import exception.UnknownPersistenceException;
import java.util.ArrayList;
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
 * @author limwe
 */
@Stateless
public class TestimonialSessionBean implements TestimonialSessionBeanLocal {

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
      
    @PersistenceContext
    private EntityManager em;
    
    private final ValidatorFactory validatorFactory;
    private final Validator validator;

    public TestimonialSessionBean() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }
    
    @Override
    public Long createTestimonial(Testimonial newTestimonial) throws UnknownPersistenceException, InputDataValidationException {
        Set<ConstraintViolation<Testimonial>>constraintViolations = validator.validate(newTestimonial);
        if (constraintViolations.isEmpty()) {
            try {
                em.persist(newTestimonial);
                em.flush();

                return newTestimonial.getTestimonialId();

            } catch (PersistenceException ex) {
                throw new UnknownPersistenceException(ex.getMessage());
            }
            
        } else {
             throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
        } 
    }
    
    @Override
    public Testimonial retrieveTestimonialById(Long id) throws TestimonialNotFoundException {
        Testimonial testimonial = em.find(Testimonial.class, id);
        
        if(testimonial != null)
        {
            return testimonial;
        }
        else
        {
            throw new TestimonialNotFoundException("Testimonial ID " + id + " does not exist!");
        }     
    }
    
    @Override
    public List<Testimonial> retrieveTestimonialbyDonationId (Long donationId) throws TestimonialNotFoundException {
        Query query = em.createQuery("SELECT t FROM Testimonial t WHERE t.donation.donationId = :donationId ORDER BY t.date DESC");
        query.setParameter("donationId", donationId);
        
        List<Testimonial> testimonialToRetrieve = query.getResultList(); 
        
        if (testimonialToRetrieve.size() == 0) {
            throw new TestimonialNotFoundException("No Testimonial cannot be found.");
        
        } else {
            return testimonialToRetrieve;
        }
    }

	@Override
	public List<Testimonial> getAllTestimonial() {
		Query q = em.createQuery("SELECT t FROM Testimonial t WHERE t.message != ''");
		return q.getResultList();
	}
    
    
    @Override
    public void deleteTestimonial(Testimonial testimonial) throws TestimonialNotFoundException {
        try {
            Testimonial testimonialToDelete = retrieveTestimonialById(testimonial.getTestimonialId());
            em.remove(testimonialToDelete);
       }
   
        catch (TestimonialNotFoundException ex) {
            throw new TestimonialNotFoundException(ex.getMessage());
        }
    }
    
    private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<Testimonial>>constraintViolations) {
        String msg = "Input data validation error!:";
            
        for(ConstraintViolation constraintViolation:constraintViolations) {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        return msg;
    }
    
}
