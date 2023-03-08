/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

/**
 *
 * @author yijie
 */
@Entity
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;
    @Column(nullable = false)
    @NotNull
    private String title;
    @Column(nullable = false)
    @NotNull
    private String message;
    @Column(nullable = false)
    @NotNull
    private Date dateTime;
    
    @ManyToOne
    //Design purposes such that this can be null before passing it into the NotificationSessionBean. Otherwise, it will result in exception. 
    //The code design in session bean and front end will ensure member's email is fed to the method.
    private Member member;

    public Notification() {
        this.dateTime = new Date();
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (getNotificationId() != null ? getNotificationId().hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the notificationId fields are not set
        if (!(object instanceof Notification)) {
            return false;
        }
        Notification other = (Notification) object;
        if ((this.getNotificationId() == null && other.getNotificationId() != null) || (this.getNotificationId() != null && !this.notificationId.equals(other.notificationId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Notification[ id=" + getNotificationId() + " ]";
    }

    public Long getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Long notificationId) {
        this.notificationId = notificationId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }
    
    
}
