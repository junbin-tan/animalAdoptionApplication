/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import ejb.session.stateless.DonationSessionBeanLocal;
import entity.Donation;
import entity.DonationStatusEnum;
import entity.Member;
import entity.PaymentModeEnum;
import entity.Testimonial;
import exception.InputDataValidationException;
import exception.UnknownPersistenceException;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author alwin
 */
@Path("donation")
@RequestScoped
public class DonationResource {

	@EJB
	private DonationSessionBeanLocal donationSessionBeanLocal;

	@GET
	@Produces(javax.ws.rs.core.MediaType.APPLICATION_JSON)
	public String getJson() {
		//TODO return proper representation object
		//throw new UnsupportedOperationException();
		return "HELLO";
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON) 
	@Produces(MediaType.APPLICATION_JSON) 
	public Donation createNewDonation(Donation newDonation) throws UnknownPersistenceException, InputDataValidationException {
		Date currentDate = new Date();
		
		newDonation.setDate(currentDate);
		newDonation.getTestimonial().setDate(currentDate);
		
		Testimonial newTestimonial = newDonation.getTestimonial();

		long testId = donationSessionBeanLocal.createNewTestimonial(newDonation.getTestimonial());
		newDonation.setTestimonial(newTestimonial);
		long donationId = donationSessionBeanLocal.createNewDonation(newDonation);
		donationSessionBeanLocal.setDonationToTestimonial(donationId, testId);
		return newDonation;
	} 

	
}