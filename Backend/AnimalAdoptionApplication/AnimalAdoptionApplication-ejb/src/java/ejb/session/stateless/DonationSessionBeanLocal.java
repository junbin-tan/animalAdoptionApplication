/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Donation;
import exception.InputDataValidationException;
import exception.UnknownPersistenceException;
import javax.ejb.Local;

/**
 *
 * @author alwin
 */
@Local
public interface DonationSessionBeanLocal {

	public Long createNewDonation(Donation newDonation) throws UnknownPersistenceException, InputDataValidationException;
	
}
