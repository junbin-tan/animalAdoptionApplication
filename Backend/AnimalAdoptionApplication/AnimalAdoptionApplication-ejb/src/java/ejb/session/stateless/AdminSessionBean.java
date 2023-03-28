/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Admin;
import exception.AdminNotFoundException;
import exception.InputDataValidationException;
import exception.UnknownPersistenceException;
import java.util.List;
import java.util.Set;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
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
public class AdminSessionBean implements AdminSessionBeanLocal {

    @PersistenceContext
    private EntityManager em;
    
    private final ValidatorFactory validatorFactory;
    private final Validator validator;

    public AdminSessionBean() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }
    
    @Override
    public Long createAdmin(Admin newAdmin) throws UnknownPersistenceException, InputDataValidationException {
        Set<ConstraintViolation<Admin>>constraintViolations = validator.validate(newAdmin);
        if (constraintViolations.isEmpty()) {
            try {
                em.persist(newAdmin);
                em.flush();

                return newAdmin.getAdminId();

            } catch (PersistenceException ex) {
                throw new UnknownPersistenceException(ex.getMessage());
            }
            
        } else {
             throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
        } 
    }

    @Override
    public Admin retrieveAdminByEmail(String emailAddress) throws AdminNotFoundException {
        Query query = em.createQuery("SELECT a FROM Admin a WHERE a.email = :emailAddress");
        query.setParameter("emailAddress", emailAddress);
        
        try
        {
            return (Admin)query.getSingleResult();
        }
        catch(NoResultException | NonUniqueResultException ex)
        {
            throw new AdminNotFoundException("Email" + emailAddress + " does not exist!");
        }
//        Admin adminToRetrieve = (Admin)query.getSingleResult();
//        
//        if (adminToRetrieve == null) {
//            throw new AdminNotFoundException("Admin cannot be found.");
//        
//        } else {
//            return adminToRetrieve;
//        }
    }

    @Override
    public void updateAdmin(Admin admin) throws AdminNotFoundException {
        try {
            Admin adminToUpdate = retrieveAdminByEmail(admin.getEmail());
            //only allowed admin to change first and last name
            adminToUpdate.setFirstName(admin.getFirstName());
            adminToUpdate.setLastName(admin.getLastName());
        
        } catch (AdminNotFoundException ex) {
            throw new AdminNotFoundException(ex.getMessage());
        }
    }
    
    
    @Override
    public List<Admin> retrieveAllAdmins()
    {
        Query query = em.createQuery("SELECT m FROM Admin m ORDER BY m.adminId ASC");
        
        return query.getResultList();
    }

    @Override
    public void deleteAdmin(Admin admin) throws AdminNotFoundException {
        try {
            Admin adminToDelete = retrieveAdminByEmail(admin.getEmail());
            em.remove(adminToDelete);
        
        } catch (AdminNotFoundException ex) {
            throw new AdminNotFoundException(ex.getMessage());
        }
    }

    private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<Admin>>constraintViolations) {
        String msg = "Input data validation error!:";
            
        for(ConstraintViolation constraintViolation:constraintViolations) {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        return msg;
    }
}









  