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
import javax.ejb.Local;

/**
 *
 * @author yijie
 */
@Local
public interface AnimalSessionBeanLocal {
    public Long createAnimal(Animal newAnimal) throws UnknownPersistenceException, InputDataValidationException;
    
    public List<Animal> retrieveAnimalByName(String name) throws AnimalNotFoundException;
    
    public void updateAnimal(Animal animal) throws AnimalNotFoundException;
    
    public void deleteAnimal (Animal animal) throws AnimalNotFoundException, AnimalCannotBeRemovedException;
    
}
