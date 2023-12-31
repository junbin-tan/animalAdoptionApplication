/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import ejb.session.stateless.EventListingSessionBeanLocal;
import ejb.session.stateless.EventRegistrationSessionBeanLocal;
import ejb.session.stateless.MemberSessionBeanLocal;
import entity.ApplicationForm;
import entity.EventListing;
import entity.EventRegistration;
import exception.ApplicationFormExistException;
import exception.EventListingNotFoundException;
import exception.EventRegistrationExistsException;
import exception.EventRegistrationNotFoundException;
import exception.InputDataValidationException;
import exception.ListingNotFoundException;
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
 * @author wkwk
 */
@Path("eventRegistration")
public class EventRegistrationResource {

    @EJB
    private EventListingSessionBeanLocal eventListingSessionBeanLocal;

    @EJB
    private EventRegistrationSessionBeanLocal eventRegistrationSessionBeanLocal;

    @EJB
    private MemberSessionBeanLocal memberSessionBeanLocal;

    @Context
    private UriInfo context;

    public EventRegistrationResource() {
    }

    @POST
    @Path("/createEventRegistration")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createEventRegistration(@Context HttpHeaders headers, EventRegistration eventRegistration) {

        List<String> authHeaders = headers.getRequestHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeaders != null ? authHeaders.get(0).split(" ")[1] : null;
        boolean validToken = JwtVerification.verifyJwtToken(token);
        String msg = "";
        if (validToken) {
            msg = "User calling this is a verified Userfront user. YAY!";

            try {
                Long applicationFormId = eventRegistrationSessionBeanLocal.createEventRegistration(eventRegistration, eventRegistration.getEventListing(), eventRegistration.getMember());

                return Response.status(204).build();

            } catch (UnknownPersistenceException ex) {
                JsonObject exception = Json.createObjectBuilder().add("error", "Unknown Persistence Exception occurred.").build();
                return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();

            } catch (InputDataValidationException ex) {
                JsonObject exception = Json.createObjectBuilder().add("error", "Input Data Validation Exception occurred.").build();
                return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();

            } catch (EventListingNotFoundException ex) {
                JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
                return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();

            } catch (EventRegistrationExistsException ex) {
                JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
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
    @Path("/getEventRegistrationByMemberEmail/{email}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventRegistrationByMemberEmail(@Context HttpHeaders headers, @PathParam("email") String email) {

        List<String> authHeaders = headers.getRequestHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeaders != null ? authHeaders.get(0).split(" ")[1] : null;
        boolean validToken = JwtVerification.verifyJwtToken(token);
        String msg = "";
        if (validToken) {
            msg = "User calling this is a verified Userfront user. YAY!";

            List<EventRegistration> eventRegistration = eventRegistrationSessionBeanLocal.retrieveEventRegistrationByEmail(email);

            for (EventRegistration er : eventRegistration) {
                er.setMember(null);
//            er.setEventListing(null);

                // we want event listing, so set nullify the inverse side
                EventListing eventListing = er.getEventListing();
                eventListing.setEventFields(null);
                eventListing.setMember(null);
                eventListing.setEventRegistrations(null);
            }

            return Response.status(200).entity(eventRegistration).build();

        } else {
            msg = "Invalid Userfront user! Go away!";
            JsonObject exception = Json.createObjectBuilder().add("error", msg).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }

    }

    @DELETE
    @Path("/deleteEventRegistration/{eventRegistrationId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteEventRegistrationById(@Context HttpHeaders headers, @PathParam("eventRegistrationId") Long eventRegistrationId) {

        List<String> authHeaders = headers.getRequestHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeaders != null ? authHeaders.get(0).split(" ")[1] : null;
        boolean validToken = JwtVerification.verifyJwtToken(token);
        String msg = "";
        if (validToken) {
            msg = "User calling this is a verified Userfront user. YAY!";

            try {
                eventRegistrationSessionBeanLocal.deleteEventRegistration(eventRegistrationId);
                return Response.status(204).build();

            } catch (EventRegistrationNotFoundException ex) {
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
