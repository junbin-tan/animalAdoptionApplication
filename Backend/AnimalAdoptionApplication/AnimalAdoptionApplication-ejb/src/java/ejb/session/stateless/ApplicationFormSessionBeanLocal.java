/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.AnimalListing;
import entity.ApplicationForm;
import entity.Member;
import exception.ApplicationFormExistException;
import exception.ApplicationNotFoundException;
import exception.InputDataValidationException;
import exception.ListingNotFoundException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
import exception.UpdateApplicationFormException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author jiawe
 */
@Local
public interface ApplicationFormSessionBeanLocal {

    public Long createNewApplication(ApplicationForm newAppForm, Member member, AnimalListing animalListing) throws UnknownPersistenceException, InputDataValidationException, MemberNotFoundException, ListingNotFoundException, ApplicationFormExistException;

    public List<ApplicationForm> retrieveAllApplicationForms();

    public ApplicationForm retrieveApplicationFormById(Long appFormId) throws ApplicationNotFoundException;

    public void updateStaff(ApplicationForm appForm) throws ApplicationNotFoundException, UpdateApplicationFormException, InputDataValidationException;

    public void deleteApplicationForm(Long appFormId) throws ApplicationNotFoundException;
    
}
