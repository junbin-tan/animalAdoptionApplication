/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import ejb.session.stateless.DonationSessionBeanLocal;
import entity.Donation;
import entity.DonationTypeEnum;
import entity.Member;
import entity.PaymentModeEnum;
import entity.Testimonial;
import exception.InputDataValidationException;
import exception.UnknownPersistenceException;
import java.util.Date;
import java.util.List;
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
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author alwin
 */
@Path("donation")
@RequestScoped
public class DonationResource {
	
	@javax.ws.rs.core.Context
	private UriInfo context;

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
		
		List<Member> listOfMember = donationSessionBeanLocal.getMemberByEmail(newDonation.getEmail());
		
		if (!listOfMember.isEmpty()) {
			newDonation.setMember(listOfMember.get(0));
			listOfMember.get(0).getDonations().add(newDonation);
		}
		if (newDonation.getDonationType().equals(DonationTypeEnum.ANONYMOUS)) {
			String anon = "ANONYMOUS";
			newDonation.setEmail(anon);
			newDonation.setMember(null);
			newDonation.setName(anon);
		} else {
			Member member = donationSessionBeanLocal.getMemberByEmail(newDonation.getEmail()).get(0);
			member.setReviewsCreated(null);
			member.setReviewsReceived(null);
			member.setEventListings(null);
			member.setEventRegistrations(null);
			member.setAnimalListings(null);
			member.setApplicationForms(null);
			member.setDonations(null);
			member.setNotifications(null);
			newDonation.setMember(member);
		}

		
		newDonation.setDate(currentDate);
		newDonation.getTestimonial().setDate(currentDate);
		newDonation.setPaymentMode(PaymentModeEnum.CREDITCARD); //only supports credit card as of now, may support paynow etc in the future
		
		Testimonial newTestimonial = newDonation.getTestimonial();

		long testId = donationSessionBeanLocal.createNewTestimonial(newDonation.getTestimonial());
		newDonation.setTestimonial(newTestimonial);
		long donationId = donationSessionBeanLocal.createNewDonation(newDonation);
		donationSessionBeanLocal.setDonationToTestimonial(donationId, testId);
		return newDonation;
	} 

	
}
