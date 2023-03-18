/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
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
public class EventRegistration implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventRegistrationId;
	
    private Boolean isActive;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    @NotNull
    private Member member;
	
    @ManyToOne
    @JoinColumn(nullable = false)
    @NotNull
    private EventListing eventListing;

    public EventRegistration() {
        this.isActive = true;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (getEventRegistrationId() != null ? getEventRegistrationId().hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the eventRegistrationId fields are not set
        if (!(object instanceof EventRegistration)) {
            return false;
        }
        EventRegistration other = (EventRegistration) object;
        if ((this.getEventRegistrationId() == null && other.getEventRegistrationId() != null) || (this.getEventRegistrationId() != null && !this.eventRegistrationId.equals(other.eventRegistrationId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.EventRegistration[ id=" + getEventRegistrationId() + " ]";
    }

    public Long getEventRegistrationId() {
        return eventRegistrationId;
    }

    public void setEventRegistrationId(Long eventRegistrationId) {
        this.eventRegistrationId = eventRegistrationId;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public EventListing getEventListing() {
        return eventListing;
    }

    public void setEventListing(EventListing eventListing) {
        this.eventListing = eventListing;
    }
    
    
}
