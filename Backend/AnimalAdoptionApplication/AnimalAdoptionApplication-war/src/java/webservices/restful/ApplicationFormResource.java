/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import ejb.session.stateless.AnimalListingSessionBeanLocal;
import ejb.session.stateless.ApplicationFormSessionBeanLocal;
import entity.AnimalListing;
import entity.ApplicationForm;
import entity.Donation;
import entity.EventListing;
import entity.EventRegistration;
import entity.Member;
import entity.Notification;
import entity.Review;
import exception.ApplicationFormExistException;
import exception.InputDataValidationException;
import exception.ListingNotFoundException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author yijie
 */
@Path("applicationForm")
public class ApplicationFormResource {
    @EJB
    private ApplicationFormSessionBeanLocal applicationFormSessionBeanLocal;
    
    @EJB
    private AnimalListingSessionBeanLocal animalListingSessionBeanLocal;

    @Context
    private UriInfo context;
    
    public ApplicationFormResource() {
    }
    
    @POST
    @Path("/createApplicationForm")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createApplicationForm(ApplicationForm appForm) {
        try {
            Member member = appForm.getMember();
            for (Review r : member.getReviewsCreated()) {
                r.setReviewedByMember(null);
            }
            
            for (Review r: member.getReviewsReceived()) {
                r.setBelongedToMember(null);
            }
            
            for (EventListing el : member.getEventListings()) {
                el.setMember(null);
            }
            
            for (EventRegistration er : member.getEventRegistrations()) {
                er.setMember(null);
            }
            
            for (AnimalListing al : member.getAnimalListings()) {
                al.setMember(null);
            }
            
            for (ApplicationForm af : member.getApplicationForms()) {
                af.setMember(null);
            }
            
            for (Donation d : member.getDonations()) {
                d.setMember(null);
            }
            
            for (Notification n : member.getNotifications()) {
                n.setMember(null);
            }
            
            AnimalListing al = appForm.getAnimalListing();
            al.getMember().setAnimalListings(null);
            
            for (ApplicationForm af : al.getApplicationForms()) {
                af.setAnimalListing(null);
            }
            
            Long applicationFormId = applicationFormSessionBeanLocal.createNewApplication(appForm, member, al);
            
            return Response.status(204).build();
            
        } catch (UnknownPersistenceException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Unknown Persistence Exception occurred.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();

        } catch (InputDataValidationException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Input Data Validation Exception occurred.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();

        } catch (ListingNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        
        } catch (ApplicationFormExistException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        
        } catch (MemberNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
}
