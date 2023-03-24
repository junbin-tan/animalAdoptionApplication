/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import ejb.session.stateless.EventListingSessionBeanLocal;
import entity.EventListing;
import exception.InputDataValidationException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
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
@Path("eventListing")
public class EventListingResource {

    @EJB
    private EventListingSessionBeanLocal eventListingSessionBeanLocal;

    @Context
    private UriInfo context;

    public EventListingResource() {
    }

    @POST
    @Path("/createEventListing")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createEventListing(EventListing newEventListing) {
        try {
            Long eventListingId = eventListingSessionBeanLocal.createEventListing(newEventListing);
            return Response.status(204).build();

        } catch (UnknownPersistenceException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Unknown Persistence Exception occurred.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();

        } catch (InputDataValidationException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Input Data Validation Exception occurred.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();

        }  catch (MemberNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<EventListing> getAllEventListings() {
        List<EventListing> allEventListings = eventListingSessionBeanLocal.retrieveAllEventListings();

        for (EventListing el : allEventListings) {
            el.getMember().setEventListings(null);
            el.getMember().setDonations(null);
            el.getMember().setAnimalListings(null);
            el.getMember().setEventRegistrations(null);
            el.getMember().setNotifications(null);
            el.getMember().setReviewsCreated(null);
            el.getMember().setReviewsReceived(null);
        }

        return allEventListings;

    }
    

}
