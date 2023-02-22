/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Animal;
import exception.AnimalCannotBeRemovedException;
import exception.AnimalNotFoundException;
import exception.InputDataValidationException;
import exception.UnknownPersistenceException;
import java.util.List;
import java.util.Set;
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
 * @author yijie
 */
@Stateless
public class AnimalSessionBean implements AnimalSessionBeanLocal {

     @PersistenceContext
    private EntityManager em;
    
    private final ValidatorFactory validatorFactory;
    private final Validator validator;

    public AnimalSessionBean() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }
    
    @Override
    public Long createAnimal(Animal newAnimal) throws UnknownPersistenceException, InputDataValidationException {
        Set<ConstraintViolation<Animal>>constraintViolations = validator.validate(newAnimal);
        if (constraintViolations.isEmpty()) {
            try {
                em.persist(newAnimal);
                em.flush();

                return newAnimal.getAnimalId();

            } catch (PersistenceException ex) {
                throw new UnknownPersistenceException(ex.getMessage());
            }
            
        } else {
             throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
        } 
    }

    @Override
    public List<Animal> retrieveAnimalByName(String name) throws AnimalNotFoundException {
        Query query = em.createQuery("SELECT a FROM Animal a WHERE a.name = :name");
        query.setParameter("name", name);
        List<Animal> animalToRetrieve = query.getResultList(); //because different animals can have same name.
        
        if (animalToRetrieve.size() == 0) {
            throw new AnimalNotFoundException("Animal cannot be found.");
        
        } else {
            return animalToRetrieve;
        }
    }

    @Override
    public void updateAnimal(Animal animal) throws AnimalNotFoundException {
        try {
            List<Animal> animalToUpdate = retrieveAnimalByName(animal.getName());
            
            for (int i = 0; i < animalToUpdate.size(); i++) { //loop through the animal list with the same name.
                Animal a = animalToUpdate.get(i);
                
                if (a.getAnimalId() == animal.getAnimalId()) {
                    a.setImage(animal.getImage());
                    a.setAge(animal.getAge());
                    a.setGender(animal.getGender());
                    a.setBreed(animal.getBreed());
                    a.setWeight(animal.getWeight());
                    a.setDescription(animal.getDescription());
                    a.setAnimalType(animal.getAnimalType());
                    a.setIsNeutered(animal.getIsNeutered());
                    
                    break;
                
                } else if (i == animalToUpdate.size() - 1) { //if loop through the list and cannot find the animal to update, throw the exception.
                    throw new AnimalNotFoundException("Animal cannot be found.");
                }
            }
            
        } catch (AnimalNotFoundException ex) {
            throw new AnimalNotFoundException(ex.getMessage());
        }
    }

    @Override
    public void deleteAnimal(Animal animal) throws AnimalNotFoundException, AnimalCannotBeRemovedException {
        try {
            List<Animal> animalToDelete = retrieveAnimalByName(animal.getName());
            
            for (Animal a : animalToDelete) { //loop through the animal list with the same name.
                if (a.getAnimalId() == animal.getAnimalId()) {
                    if (a.getAnimalListing().getIsActive()) {
                        throw new AnimalCannotBeRemovedException("Animal is listed on the website.");
                    
                    } else {
                        em.remove(a);
                    }
                }
            }
            
        } catch (AnimalNotFoundException ex) {
            throw new AnimalNotFoundException(ex.getMessage());
        }
    }
    
    private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<Animal>>constraintViolations) {
        String msg = "Input data validation error!:";
            
        for(ConstraintViolation constraintViolation:constraintViolations) {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        return msg;
    }
    

}
