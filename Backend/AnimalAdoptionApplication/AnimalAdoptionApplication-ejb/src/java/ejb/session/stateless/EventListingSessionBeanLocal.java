/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.EventListing;
import entity.Member;
import exception.DeleteEventListingException;
import exception.EventListingNotFoundException;
import exception.InputDataValidationException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
import exception.UpdateEventListingException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author shann
 */
@Local
public interface EventListingSessionBeanLocal {
    
   // public Long createEventListing(EventListing eventListing, Member member) throws MemberNotFoundException, UnknownPersistenceException, InputDataValidationException;
    
    public List<EventListing> retrieveAllEventListings();
    
    public List<EventListing> retrieveEventListingByMemberEmail(String email);
    
    public EventListing retrieveEventListingById(Long eventListingId) throws EventListingNotFoundException;
    
    public EventListing retrieveEventListingByEventName(String eventName) throws EventListingNotFoundException;
    
    //need to retrieve by date?
    
    public void updateEventListing(EventListing eventListing) throws EventListingNotFoundException, UpdateEventListingException, InputDataValidationException;
    
    public void deleteEventListing(Long eventListingId) throws EventListingNotFoundException, MemberNotFoundException, DeleteEventListingException;

    public Long createEventListing(EventListing eventListing) throws MemberNotFoundException, UnknownPersistenceException, InputDataValidationException;
    
}
