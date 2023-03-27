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
import java.util.Set;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
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
public class EventRegistrationSessionBean implements EventRegistrationSessionBeanLocal {

    @EJB(name = "MemberSessionBeanLocal")
    private MemberSessionBeanLocal memberSessionBeanLocal;
    @EJB
    private EventListingSessionBeanLocal eventListingSessionBeanLocal;

    @PersistenceContext(unitName = "AnimalAdoptionApplication-ejbPU")
    private EntityManager em;

    private final ValidatorFactory validatorFactory;
    private final Validator validator;

    public EventRegistrationSessionBean() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @Override
    public Long createEventRegistration(EventRegistration eventRegistration, EventListing eventListing, Member member) throws EventRegistrationExistsException, EventListingNotFoundException, MemberNotFoundException, UnknownPersistenceException, InputDataValidationException {
        Set<ConstraintViolation<EventRegistration>> constraintViolations = validator.validate(eventRegistration);

        EventListing thisEventListing = eventListingSessionBeanLocal.retrieveEventListingById(eventListing.getEventListingId());
        Member thisMember = memberSessionBeanLocal.retrieveMemberByMemberId(member.getMemberId());

        if (constraintViolations.isEmpty()) {
            try {
                
                Member managedMember = memberSessionBeanLocal.retrieveMemberByMemberId(member.getMemberId());
                
                List<EventRegistration>  managedEventRegistration = retrieveAllEventRegistrationForMember(member.getMemberId());  

                for (int i = 0; i< managedEventRegistration.size(); i ++) {                  
                    if(managedEventRegistration.get(i).getEventListing().getEventListingId() == eventListing.getEventListingId()) {
                            throw new EventRegistrationExistsException("Member has already registered for event!");
                    }
                }
                           
                thisEventListing.getEventRegistrations().add(eventRegistration);
                thisMember.getEventRegistrations().add(eventRegistration);

                eventRegistration.setEventListing(thisEventListing);
                eventRegistration.setMember(thisMember);

                em.persist(eventRegistration);
                em.flush();
                
                return eventRegistration.getEventRegistrationId();
            } catch (PersistenceException ex) {
                if (ex.getCause() != null && ex.getCause().getClass().getName().equals("org.eclipse.persistence.exceptions.DatabaseException")) {
                    if (ex.getCause().getCause() != null && ex.getCause().getCause().getClass().getName().equals("java.sql.SQLIntegrityConstraintViolationException")) {
                        throw new EventRegistrationExistsException();
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
    public List<EventRegistration> retrieveAllEventRegistrations() {
        Query query = em.createQuery("SELECT e FROM EventRegistration e ORDER BY e.eventRegistrationId ASC");

        return query.getResultList();
    }

    @Override
    public EventRegistration retrieveEventRegistrationById(Long eventRegistrationId) throws EventRegistrationNotFoundException {
        EventRegistration eventRegistration = em.find(EventRegistration.class, eventRegistrationId);

        if (eventRegistration != null) {
            return eventRegistration;
        } else {
            throw new EventRegistrationNotFoundException("Event Registration ID " + eventRegistrationId + " not found!");
        }
    }

    @Override
    public List<EventRegistration> retrieveAllEventRegistrationForMember(Long memberId) throws MemberNotFoundException {
        Query query = em.createQuery("SELECT e FROM EventRegistration e WHERE e.member.memberId = :memberId");
        query.setParameter("memberId", memberId);

        return query.getResultList();
    }

    @Override
    public List<EventRegistration> retrieveAllEventRegistrationForEventListing(Long eventListingId) throws EventListingNotFoundException {
        Query query = em.createQuery("SELECT e FROM EventRegistration e WHERE e.eventListing.eventListingId = :eventListingId");
        query.setParameter("eventListingId", eventListingId);

        return query.getResultList();
    }

    @Override
    public void updateEventRegistration(EventRegistration eventRegistration) throws EventRegistrationNotFoundException, UpdateEventRegistrationException, InputDataValidationException {
        if (eventRegistration != null && eventRegistration.getEventRegistrationId() != null) {

            Set<ConstraintViolation<EventRegistration>> constraintViolations = validator.validate(eventRegistration);

            if (constraintViolations.isEmpty()) {
                EventRegistration eventRegistrationToUpdate = retrieveEventRegistrationById(eventRegistration.getEventRegistrationId());

                if (eventRegistrationToUpdate.getEventRegistrationId().equals(eventRegistration.getEventRegistrationId()))
                {
                    eventRegistrationToUpdate.setIsActive(eventRegistration.getIsActive());
                    
                } else {
                    throw new UpdateEventRegistrationException("Event Registration to be updated does not match the exisitng record");
                }
            } else {
                throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
            }
        } else {
            throw new EventRegistrationNotFoundException("Event Registration ID not provided for event registrationto be updated");
        }
    }

    @Override
    public void deleteEventRegistration(Long eventRegistrationId) throws EventRegistrationNotFoundException, EventListingNotFoundException, MemberNotFoundException {
        EventRegistration eventRegistrationToRemove = retrieveEventRegistrationById(eventRegistrationId);
        Member member = eventRegistrationToRemove.getMember();
        EventListing eventListing = eventRegistrationToRemove.getEventListing();
        
        member.getEventRegistrations().remove(eventRegistrationToRemove);
        eventListing.getEventRegistrations().remove(eventRegistrationToRemove);
        
        em.remove(eventRegistrationToRemove);
        
    }

    private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<EventRegistration>> constraintViolations) {
        String msg = "Input data validation error!:";

        for (ConstraintViolation constraintViolation : constraintViolations) {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        return msg;
    }

}
