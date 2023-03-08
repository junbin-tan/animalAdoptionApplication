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
import exception.NotificationExistsException;
import exception.NotificationNotFoundException;
import exception.UnknownPersistenceException;
import exception.UpdateNotificationException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author jiawe
 */
@Local
public interface NotificationSessionBeanLocal {

    public Long createNewNotification(String emailAddress, Notification newNotification) throws UnknownPersistenceException, InputDataValidationException, NotificationExistsException, MemberNotFoundException;

    public Notification retrieveNotificationById(Long notificationId) throws NotificationNotFoundException;
    
    public List<Notification> retrieveAllNotificationsToMember(String emailAddress) throws MemberNotFoundException;

    public void updateNotification(Notification notification) throws NotificationNotFoundException, UpdateNotificationException, InputDataValidationException;

    public void deleteNotification(Long notificationId) throws NotificationNotFoundException;
    
}
