/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;



import entity.Member;
import entity.Notification;
import exception.InputDataValidationException;
import exception.MemberNotFoundException;
import exception.NotificationExistException;
import exception.NotificationNotFoundException;
import exception.UnknownPersistenceException;
import exception.UpdateNotificationException;
import java.util.Set;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

/**
 *
 * @author jiawe
 */
@Stateless
public class NotificationSessionBean implements NotificationSessionBeanLocal {

    @EJB(name = "MemberSessionBeanLocal")
    private MemberSessionBeanLocal memberSessionBeanLocal;

    @PersistenceContext(unitName = "AnimalAdoptionApplication-ejbPU")
    private EntityManager em;

    private final ValidatorFactory validatorFactory;
    private final Validator validator;

    public NotificationSessionBean() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }
    
    @Override
    public Long createNewNotification(Notification newNotification, Member member) throws UnknownPersistenceException, InputDataValidationException, NotificationExistException, MemberNotFoundException {
        Set<ConstraintViolation<Notification>> constraintViolations = validator.validate(newNotification);
        if (constraintViolations.isEmpty()) {
            try {

                Member managedMember = memberSessionBeanLocal.retrieveMemberByMemberId(member.getMemberId());

                newNotification.setMember(managedMember);
                managedMember.getNotifications().add(newNotification);

           

                em.persist(newNotification);
                em.flush();

                return newNotification.getNotificationId();
            } catch (PersistenceException ex) {
                if (ex.getCause() != null && ex.getCause().getClass().getName().equals("org.eclipse.persistence.exceptions.DatabaseException")) {
                    if (ex.getCause().getCause() != null && ex.getCause().getCause().getClass().getName().equals("java.sql.SQLIntegrityConstraintViolationException")) {
                        throw new NotificationExistException();
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
    public Notification retrieveNotificationById(Long notificationId) throws NotificationNotFoundException {
        Notification notification = em.find(Notification.class, notificationId);

        if (notification != null) {
            return notification;
        } else {
            throw new NotificationNotFoundException("Notification ID " + notificationId + " not found!");
        }
    }
    
    
    
    @Override
    public void updateNotification(Notification notification) throws NotificationNotFoundException, UpdateNotificationException, InputDataValidationException {
        if (notification != null && notification.getNotificationId() != null) {
            Set<ConstraintViolation<Notification>> constraintViolations = validator.validate(notification);

            if (constraintViolations.isEmpty()) {
                Notification notificationToUpdate = retrieveNotificationById(notification.getNotificationId());

                if (notificationToUpdate.getNotificationId().equals(notification.getNotificationId())) {
                    notificationToUpdate.setTitle(notification.getTitle());
                    notificationToUpdate.setMessage(notification.getMessage());
                    notificationToUpdate.setDateTime(notification.getDateTime()); // might need use new Date() to get current date time
                } else {
                    throw new UpdateNotificationException("Id of Notification record to be updated does not match the existing record");
                }
            } else {
                throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
            }
        } else {
            throw new NotificationNotFoundException("Notification ID not provided for application form to be updated");
        }
    }
    
    
    @Override
    public void deleteNotification(Long notificationId) throws NotificationNotFoundException {
        Notification notificationToRemove = retrieveNotificationById(notificationId);
        Member member = notificationToRemove.getMember();
        
        notificationToRemove.setMember(null);
        member.getNotifications().remove(notificationToRemove);
        
        em.remove(notificationToRemove);
    }
    
    
    
    
    
    
    
    
    
    
    private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<Notification>> constraintViolations) {
        String msg = "Input data validation error!:";

        for (ConstraintViolation constraintViolation : constraintViolations) {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }

        return msg;
    }

}
