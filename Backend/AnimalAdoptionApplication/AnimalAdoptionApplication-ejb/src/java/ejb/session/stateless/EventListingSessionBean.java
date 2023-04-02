/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.EventListing;
import entity.EventRegistration;
import entity.Member;
import exception.DeleteEventListingException;
import exception.EventListingNotFoundException;
import exception.InputDataValidationException;
import exception.ListingExistException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
import exception.UpdateEventListingException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.TimeZone;
import javax.ejb.EJB;
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
 * @author shann
 */
@Stateless
public class EventListingSessionBean implements EventListingSessionBeanLocal {

    @EJB(name = "MemberSessionBeanLocal")
    private MemberSessionBeanLocal memberSessionBeanLocal;

    @PersistenceContext(unitName = "AnimalAdoptionApplication-ejbPU")
    private EntityManager em;

    private final ValidatorFactory validatorFactory;
    private final Validator validator;

    public EventListingSessionBean() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @Override
    public Long createEventListing(EventListing eventListing) throws MemberNotFoundException, UnknownPersistenceException, InputDataValidationException {
        Set<ConstraintViolation<EventListing>> constraintViolations = validator.validate(eventListing);

       Member thisMember = memberSessionBeanLocal.retrieveMemberByMemberId(eventListing.getMember().getMemberId());

        if (constraintViolations.isEmpty()) {
            try {
                //association with member
                thisMember.getEventListings().add(eventListing);
                eventListing.setMember(thisMember);
                
                 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm", Locale.ENGLISH);
                TimeZone tz = TimeZone.getTimeZone("Asia/Singapore");
                sdf.setTimeZone(tz);
                java.util.Date date = new java.util.Date();
                
                eventListing.setCreateDate(date);

                em.persist(eventListing);
                em.flush();

                return eventListing.getEventListingId();
            } catch (PersistenceException ex) {
                throw new UnknownPersistenceException(ex.getMessage());
            }

        } else {
            throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
        }
    }

    @Override
    public List<EventListing> retrieveAllEventListings() {
        Query query = em.createQuery("SELECT e FROM EventListing e ORDER BY e.eventListingId ASC");

        return query.getResultList();
    }
    
    @Override
    public List<EventListing> retrieveEventListingByMemberEmail(String email) {
        Query query = em.createQuery("SELECT e FROM EventListing e WHERE e.member.email = :email");
        query.setParameter("email", email);
        
        List<EventListing> eventListings = query.getResultList();
        for (EventListing el : eventListings) {
            el.getEventRegistrations().size(); // lazy loading to get event registrations
        }
        
        return query.getResultList();
    }

    @Override
    public EventListing retrieveEventListingById(Long eventListingId) throws EventListingNotFoundException {
        EventListing eventListing = em.find(EventListing.class,
                eventListingId);

        if (eventListing != null) {
            return eventListing;
        } else {
            throw new EventListingNotFoundException("EventListing ID " + eventListingId + " does not exist!");
        }
    }

    @Override
    public EventListing retrieveEventListingByEventName(String eventName) throws EventListingNotFoundException {
        Query query = em.createQuery("SELECT e FROM EventListing e WHERE e.eventName = :eventName");
        query.setParameter("eventName", eventName);

        try {
            return (EventListing) query.getSingleResult();
        } catch (NoResultException | NonUniqueResultException ex) {
            throw new EventListingNotFoundException("Event Name " + eventName + " not found!");
        }
    }

    @Override
    public void updateEventListing(EventListing eventListing) throws EventListingNotFoundException, UpdateEventListingException, InputDataValidationException {

        if (eventListing != null && eventListing.getEventListingId() != null) {

            Set<ConstraintViolation<EventListing>> constraintViolations = validator.validate(eventListing);

            if (constraintViolations.isEmpty()) {
                EventListing eventListingToUpdate = retrieveEventListingById(eventListing.getEventListingId());

                if (eventListingToUpdate.getEventListingId().equals(eventListing.getEventListingId())) //able to update the event name/data and time?
                {
                    eventListingToUpdate.setLocation(eventListing.getLocation());
                    eventListingToUpdate.setCapacity(eventListing.getCapacity());
                    eventListingToUpdate.setDescription(eventListing.getDescription());
                    eventListingToUpdate.setImage(eventListing.getImage());
                } else {
                    throw new UpdateEventListingException("Event Listing to be updated does not match the exisitng record");
                }
            } else {
                throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
            }
        } else {
            throw new EventListingNotFoundException("EventListing ID not provided for event listing to be jupdated");
        }
    }

    @Override
    public void deleteEventListing(Long eventListingId) throws EventListingNotFoundException, MemberNotFoundException, DeleteEventListingException {
        EventListing eventListingToRemove = retrieveEventListingById(eventListingId);
        Member thisMember = memberSessionBeanLocal.retrieveMemberByMemberId(eventListingToRemove.getMember().getMemberId());
        List<EventRegistration> eventRegistrations = eventListingToRemove.getEventRegistrations();

        if (eventRegistrations.isEmpty()) {
            thisMember.getEventListings().remove(eventListingToRemove);
            em.remove(eventListingToRemove);
        } else {
            throw new DeleteEventListingException("Event Listing is associated with existing event registrations and cannot be deleted!");
        }
    }

    private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<EventListing>> constraintViolations) {
        String msg = "Input data validation error!:";

        for (ConstraintViolation constraintViolation : constraintViolations) {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        return msg;
    }

}
