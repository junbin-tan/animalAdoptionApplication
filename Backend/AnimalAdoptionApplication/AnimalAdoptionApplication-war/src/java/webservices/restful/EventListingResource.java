/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import ejb.session.stateless.EventListingSessionBeanLocal;
import entity.ApplicationForm;
import entity.EventListing;
import entity.EventRegistration;
import exception.DeleteEventListingException;
import exception.EventListingNotFoundException;
import exception.InputDataValidationException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
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
    public Response createEventListing(@Context HttpHeaders headers, EventListing newEventListing) {

        List<String> authHeaders = headers.getRequestHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeaders != null ? authHeaders.get(0).split(" ")[1] : null;
        boolean validToken = JwtVerification.verifyJwtToken(token);
        String msg = "";
        if (validToken) {
            msg = "User calling this is a verified Userfront user. YAY!";

            try {
                Long eventListingId = eventListingSessionBeanLocal.createEventListing(newEventListing);
                return Response.status(204).build();

            } catch (UnknownPersistenceException ex) {
                JsonObject exception = Json.createObjectBuilder().add("error", "Unknown Persistence Exception occurred.").build();
                return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();

            } catch (InputDataValidationException ex) {
                JsonObject exception = Json.createObjectBuilder().add("error", "Input Data Validation Exception occurred.").build();
                return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();

            } catch (MemberNotFoundException ex) {
                JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
                return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
            }

        } else {
            msg = "Invalid Userfront user! Go away!";
            JsonObject exception = Json.createObjectBuilder().add("error", msg).build();
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
            el.getMember().setApplicationForms(null);

            for (EventRegistration er : el.getEventRegistrations()) {
                er.setEventListing(null);
                er.setMember(null);
            }
        }

        return allEventListings;

    }

    @GET
    @Path("/getAllEventListingsAdmin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllEventListingsAdmin(@Context HttpHeaders headers) {

        List<String> authHeaders = headers.getRequestHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeaders != null ? authHeaders.get(0).split(" ")[1] : null;
        boolean validToken = AdminJwtVerification.verifyJwtToken(token);
        String msg = "";
        if (validToken) {
            msg = "User calling this is a verified Userfront user. YAY!";
            List<EventListing> allEventListings = eventListingSessionBeanLocal.retrieveAllEventListings();

            for (EventListing el : allEventListings) {
                el.getMember().setEventListings(null);
                el.getMember().setDonations(null);
                el.getMember().setAnimalListings(null);
                el.getMember().setEventRegistrations(null);
                el.getMember().setNotifications(null);
                el.getMember().setReviewsCreated(null);
                el.getMember().setReviewsReceived(null);
                el.getMember().setApplicationForms(null);

                for (EventRegistration er : el.getEventRegistrations()) {
                    er.setEventListing(null);
                    er.setMember(null);
                }
            }

            return Response.status(200).entity(allEventListings).build();
        } else {
            msg = "Invalid Userfront user! Go away!";
            JsonObject exception = Json.createObjectBuilder().add("error", msg).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }

    }

    @GET
    @Path("/getEventListingByMemberEmail/{email}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventListingByMemberEmail(@Context HttpHeaders headers, @PathParam("email") String emailAddress) {

        List<String> authHeaders = headers.getRequestHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeaders != null ? authHeaders.get(0).split(" ")[1] : null;
        boolean validToken = JwtVerification.verifyJwtToken(token);
        String msg = "";
        if (validToken) {
            msg = "User calling this is a verified Userfront user. YAY!";

            List<EventListing> eventListings = eventListingSessionBeanLocal.retrieveEventListingByMemberEmail(emailAddress);

            for (EventListing el : eventListings) {
                el.setMember(null);
                for (EventRegistration er : el.getEventRegistrations()) {
                    er.setEventListing(null);

                    // need to retrieve member on each event registration to know who submittted it
                    // so set inverse member relationship to null
                    er.getMember().setAnimalListings(null);
                    er.getMember().setDonations(null);
                    er.getMember().setEventListings(null);
                    er.getMember().setEventRegistrations(null);
                    er.getMember().setNotifications(null);
                    er.getMember().setReviewsCreated(null);
                    er.getMember().setReviewsReceived(null);
                    er.getMember().setApplicationForms(null);
                }
            }

            return Response.status(200).entity(eventListings).build();

        } else {
            msg = "Invalid Userfront user! Go away!";
            JsonObject exception = Json.createObjectBuilder().add("error", msg).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }

    }

    @DELETE
    @Path("/deleteEventListing/{eventListingId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteEventListingById(@Context HttpHeaders headers, @PathParam("eventListingId") Long eventListingId) {

        List<String> authHeaders = headers.getRequestHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeaders != null ? authHeaders.get(0).split(" ")[1] : null;
        boolean validToken = JwtVerification.verifyJwtToken(token);
        String msg = "";
        if (validToken) {
            msg = "User calling this is a verified Userfront user. YAY!";
            try {
                eventListingSessionBeanLocal.deleteEventListing(eventListingId);
                return Response.status(204).build();
            } catch (EventListingNotFoundException | MemberNotFoundException | DeleteEventListingException ex) {
                JsonObject exception = Json.createObjectBuilder()
                        .add("error", ex.getMessage())
                        .build();
                return Response.status(404).entity(exception).build();
            }

        } else {
            msg = "Invalid Userfront user! Go away!";
            JsonObject exception = Json.createObjectBuilder().add("error", msg).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }

    }

}
