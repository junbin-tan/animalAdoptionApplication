/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Animal;
import entity.AnimalListing;
import entity.ApplicationForm;
import entity.Donation;
import entity.EventListing;
import entity.EventRegistration;
import entity.Member;
import entity.Review;
import exception.AnimalNotFoundException;
import exception.DeleteAnimalListingException;
import exception.InputDataValidationException;
import exception.ListingExistException;
import exception.ListingNotFoundException;
import exception.MemberExistsException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
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
 * @author Jun Bin
 */
@Stateless
public class AnimalListingSessionBean implements AnimalListingSessionBeanLocal {

    @EJB(name = "AnimalSessionBeanLocal")
    private AnimalSessionBeanLocal animalSessionBeanLocal;

    @EJB(name = "MemberSessionBeanLocal")
    private MemberSessionBeanLocal memberSessionBeanLocal;

    
    
    
    @PersistenceContext(unitName = "AnimalAdoptionApplication-ejbPU")
    private EntityManager em;

    
    
    
    private final ValidatorFactory validatorFactory;
    private final Validator validator;

    public AnimalListingSessionBean() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    
    @Override
    public Long createAnimalListing(AnimalListing newListing, Member member, Animal animal) throws ListingExistException, UnknownPersistenceException, InputDataValidationException, AnimalNotFoundException, MemberNotFoundException
    {
        Set<ConstraintViolation<AnimalListing>>constraintViolations = validator.validate(newListing);
        Animal thisAnimal = animalSessionBeanLocal.retrieveAnimalById(animal.getAnimalId());
        Member thisMember = memberSessionBeanLocal.retrieveMemberByMemberId(member.getMemberId());
        
        if(constraintViolations.isEmpty())
        {
            try
            {
                //association
                thisMember.getAnimalListings().add(newListing);
                thisAnimal.setAnimalListing(newListing);
                
                newListing.setMember(thisMember);
                newListing.setAnimal(thisAnimal);
                
                em.persist(newListing);
                em.flush();

                return newListing.getAnimalListingId();
            }
            catch(PersistenceException ex)
            {
                if(ex.getCause() != null && ex.getCause().getClass().getName().equals("org.eclipse.persistence.exceptions.DatabaseException"))
                {
                    if(ex.getCause().getCause() != null && ex.getCause().getCause().getClass().getName().equals("java.sql.SQLIntegrityConstraintViolationException"))
                    {
                        throw new ListingExistException();
                    }
                    else
                    {
                        throw new UnknownPersistenceException(ex.getMessage());
                    }
                }
                else
                {
                    throw new UnknownPersistenceException(ex.getMessage());
                }
            }
        }
        else
        {
            throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
        }
    }
    
    
    @Override
    public List<AnimalListing> retrieveAllMembers()
    {
        Query query = em.createQuery("SELECT l FROM AnimalListing l ORDER BY l.animalListingId ASC");
        
        return query.getResultList();
    }
    
    @Override
    public AnimalListing retrieveAnimalListingByAnimalListingId(Long id) throws ListingNotFoundException
    {
        AnimalListing al = em.find(AnimalListing.class, id);
        
        if(al != null)
        {
            return al;
        }
        else
        {
            throw new ListingNotFoundException("Animal Listing ID " + id + " does not exist!");
        }               
    }
    
     public void deleteAnimalListing(Long id) throws ListingNotFoundException, DeleteAnimalListingException, AnimalNotFoundException, MemberNotFoundException
    {
        AnimalListing toRemove = retrieveAnimalListingByAnimalListingId(id);
        Animal thisAnimal = animalSessionBeanLocal.retrieveAnimalById(toRemove.getAnimal().getAnimalId());
        Member thisMember = memberSessionBeanLocal.retrieveMemberByMemberId(toRemove.getMember().getMemberId());
        
        //Does not remove all the application form JUST FYI
        
        thisAnimal.setAnimalListing(null);
        thisMember.getAnimalListings().remove(toRemove);
     
        em.remove(toRemove);
        
       
    }
    
    
    
    
    private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<AnimalListing>> constraintViolations) {
        String msg = "Input data validation error!:";

        for (ConstraintViolation constraintViolation : constraintViolations) {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        return msg;
    }

    public void persist(Object object) {
        em.persist(object);
    }

    public void persist1(Object object) {
        em.persist(object);
    }

}
