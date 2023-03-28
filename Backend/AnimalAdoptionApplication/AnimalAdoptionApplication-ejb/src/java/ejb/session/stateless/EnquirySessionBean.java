/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Enquiry;
import exception.InputDataValidationException;
import exception.UnknownPersistenceException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.TimeZone;
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
 * @author yijie
 */
@Stateless
public class EnquirySessionBean implements EnquirySessionBeanLocal {
 @PersistenceContext(unitName = "AnimalAdoptionApplication-ejbPU")
    private EntityManager em;

    private final ValidatorFactory validatorFactory;
    private final Validator validator;

    public EnquirySessionBean() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }
    
    @Override
    public Long createEnquiry(Enquiry newEnquiry) throws UnknownPersistenceException, InputDataValidationException {
        Set<ConstraintViolation<Enquiry>>constraintViolations = validator.validate(newEnquiry);
        if (constraintViolations.isEmpty()) {
            try {
                //adding the creation date
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm", Locale.ENGLISH);
                TimeZone tz = TimeZone.getTimeZone("Asia/Singapore");
                sdf.setTimeZone(tz);
                java.util.Date date = new java.util.Date();
                newEnquiry.setCreateDate(date);
                em.persist(newEnquiry);
                em.flush();

                return newEnquiry.getEnquiryId();

            } catch (PersistenceException ex) {
                throw new UnknownPersistenceException(ex.getMessage());
            }
            
        } else {
             throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
        } 
    }
    
     private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<Enquiry>>constraintViolations) {
        String msg = "Input data validation error!:";
            
        for(ConstraintViolation constraintViolation:constraintViolations) {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        return msg;
    }
    
     
    @Override
    public List<Enquiry> retrieveAllEnquirys()
    {
        Query query = em.createQuery("SELECT l FROM Enquiry l ORDER BY l.enquiryId DESC");
        
        return query.getResultList();
    }
    
}
