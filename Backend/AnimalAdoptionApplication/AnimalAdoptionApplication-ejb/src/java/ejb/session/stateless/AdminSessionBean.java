/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import java.util.Set;
import javax.ejb.Stateless;
import javax.persistence.PersistenceException;
import javax.validation.ConstraintViolation;

/**
 *
 * @author yijie
 */
@Stateless
public class AdminSessionBean implements AdminSessionBeanLocal {

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
}
//Set<ConstraintViolation<Book>>constraintViolations = validator.validate(newBook);
//        if (constraintViolations.isEmpty()) {
//            try {
//                em.persist(newBook);
//                em.flush();
//
//                return newBook.getBookId();
//
//            } catch (PersistenceException ex) {
//                throw new UnknownPersistenceException(ex.getMessage());
//            }
//        } else {
//             throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
//        } 
//
//  private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<Book>>constraintViolations) {
//        String msg = "Input data validation error!:";
//            
//        for(ConstraintViolation constraintViolation:constraintViolations) {
//            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
//        }
//        return msg;
//    }