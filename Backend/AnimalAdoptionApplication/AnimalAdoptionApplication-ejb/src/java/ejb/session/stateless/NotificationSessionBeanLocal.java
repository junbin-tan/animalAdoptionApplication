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
import javax.ejb.Local;

/**
 *
 * @author jiawe
 */
@Local
public interface NotificationSessionBeanLocal {

    public Long createNewNotification(Notification newNotification, Member member) throws UnknownPersistenceException, InputDataValidationException, NotificationExistException, MemberNotFoundException;

    public Notification retrieveNotificationById(Long notificationId) throws NotificationNotFoundException;

    public void updateNotification(Notification notification) throws NotificationNotFoundException, UpdateNotificationException, InputDataValidationException;

    public void deleteNotification(Long notificationId) throws NotificationNotFoundException;
    
}
