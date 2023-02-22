/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Animal;
import entity.AnimalListing;
import entity.Member;
import exception.AnimalNotFoundException;
import exception.DeleteAnimalListingException;
import exception.InputDataValidationException;
import exception.ListingExistException;
import exception.ListingNotFoundException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author Jun Bin
 */
@Local
public interface AnimalListingSessionBeanLocal {

    public Long createAnimalListing(AnimalListing newListing, Member member, Animal animal) throws ListingExistException, UnknownPersistenceException, InputDataValidationException, AnimalNotFoundException, MemberNotFoundException;

    public List<AnimalListing> retrieveAllMembers();

    public AnimalListing retrieveAnimalListingByAnimalListingId(Long id) throws ListingNotFoundException;

    public void deleteAnimalListing(Long id) throws ListingNotFoundException, DeleteAnimalListingException, AnimalNotFoundException, MemberNotFoundException;
    
}
