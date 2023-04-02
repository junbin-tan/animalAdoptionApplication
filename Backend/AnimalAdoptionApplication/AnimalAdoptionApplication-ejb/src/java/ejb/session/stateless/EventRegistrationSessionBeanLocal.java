/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.EventListing;
import entity.EventRegistration;
import entity.Member;
import exception.EventListingNotFoundException;
import exception.EventRegistrationExistsException;
import exception.EventRegistrationNotFoundException;
import exception.InputDataValidationException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
import exception.UpdateEventRegistrationException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author shann
 */
@Local
public interface EventRegistrationSessionBeanLocal {
    
    public Long createEventRegistration(EventRegistration eventRegistration, EventListing eventListing, Member member) throws EventRegistrationExistsException, EventListingNotFoundException, MemberNotFoundException, UnknownPersistenceException, InputDataValidationException;
    
    public List<EventRegistration> retrieveAllEventRegistrations();
    
    public List<EventRegistration> retrieveEventRegistrationByEmail(String email);
    
    public EventRegistration retrieveEventRegistrationById(Long eventRegistrationId) throws EventRegistrationNotFoundException;
    
    public List<EventRegistration> retrieveAllEventRegistrationForMember(Long memberId) throws MemberNotFoundException;
    
    public List<EventRegistration> retrieveAllEventRegistrationForEventListing(Long eventListingId) throws EventListingNotFoundException;
    
    public void updateEventRegistration(EventRegistration eventRegistration) throws EventRegistrationNotFoundException, UpdateEventRegistrationException, InputDataValidationException;
    
    public void deleteEventRegistration(Long eventRegistrationId) throws EventRegistrationNotFoundException, EventListingNotFoundException, MemberNotFoundException;
}
