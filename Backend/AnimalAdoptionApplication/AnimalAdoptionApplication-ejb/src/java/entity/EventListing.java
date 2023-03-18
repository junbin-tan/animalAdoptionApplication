/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 *
 * @author yijie
 */
@Entity
public class EventListing implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventListingId;
	
    @Column(length = 64, nullable = false)
    @NotNull
    private String eventName;
	
    @Column(nullable = false)
	@Temporal(TemporalType.DATE)
    @NotNull
    private Date dateAndTime;
	
    @Column(length = 128, nullable = false)
    @NotNull
    private String location;
	
    @Column(nullable = false)
    @NotNull
    private Double capacity;
	
    @Column(nullable = false)
    @NotNull
    private String description;
	
    private String image;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    @NotNull
    private Member member;
	
    @OneToMany(mappedBy = "eventListing")
    private List<EventField> eventFields;
	
    @OneToMany(mappedBy = "eventListing")
    private List<EventRegistration> eventRegistrations;

    public EventListing() {
        this.eventFields = new ArrayList<EventField>();
        this.eventRegistrations = new ArrayList<EventRegistration>();
    }
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (eventListingId != null ? eventListingId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the eventListingId fields are not set
        if (!(object instanceof EventListing)) {
            return false;
        }
        EventListing other = (EventListing) object;
        if ((this.eventListingId == null && other.eventListingId != null) || (this.eventListingId != null && !this.eventListingId.equals(other.eventListingId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.EventListing[ id=" + eventListingId + " ]";
    }
    
    public Long getEventListingId() {
        return eventListingId;
    }

    public void setEventListingId(Long eventListingId) {
        this.eventListingId = eventListingId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public Date getDateAndTime() {
        return dateAndTime;
    }

    public void setDateAndTime(Date dateAndTime) {
        this.dateAndTime = dateAndTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getCapacity() {
        return capacity;
    }

    public void setCapacity(Double capacity) {
        this.capacity = capacity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public List<EventField> getEventFields() {
        return eventFields;
    }

    public void setEventFields(List<EventField> eventFields) {
        this.eventFields = eventFields;
    }

    public List<EventRegistration> getEventRegistrations() {
        return eventRegistrations;
    }

    public void setEventRegistrations(List<EventRegistration> eventRegistrations) {
        this.eventRegistrations = eventRegistrations;
    }

}
