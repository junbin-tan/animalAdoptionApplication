/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import ejb.session.stateless.DonationSessionBeanLocal;
import ejb.session.stateless.TestimonialSessionBeanLocal;
import entity.Donation;
import entity.Enquiry;
import entity.Testimonial;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import sun.net.www.content.text.Generic;

/**
 *
 * @author alwin
 */
@Path("testimonial")
public class TestimonialResource {

	@javax.ws.rs.core.Context
	private UriInfo context;

	@EJB
	private TestimonialSessionBeanLocal testimonialSessionBeanLocal;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Testimonial> getAllTestimonial() {
		List<Testimonial> listOfTestimonials = testimonialSessionBeanLocal.getAllTestimonial();

		for (Testimonial t :listOfTestimonials) {
			t.setDonation(null);
		}

		return listOfTestimonials;
	}

	
	
}
