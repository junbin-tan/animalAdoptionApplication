/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import ejb.session.stateless.AnimalListingSessionBeanLocal;
import ejb.session.stateless.EventListingSessionBeanLocal;
import entity.AnimalListing;
import entity.ApplicationForm;
import entity.EventListing;
import entity.Member;
import exception.AnimalListingHasApplicationFormException;
import exception.DeleteAnimalListingException;
import exception.InputDataValidationException;
import exception.ListingExistException;
import exception.ListingNotFoundException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
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
    
/*
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<AnimalListing> getAllAnimalListings() {
        List<AnimalListing> allAnimalListings = animalListingSessionBeanLocal.retrieveAllAnimalListings();

        for (AnimalListing al : allAnimalListings) {
            al.getMember().setAnimalListings(null);
            al.getMember().setDonations(null);

            for (ApplicationForm af : al.getApplicationForms()) {
                af.setAnimalListing(null);
                af.setMember(null);
            }
        }

        return allAnimalListings;

    }

    @GET
    @Path("/getAnimalListingByMemberEmail/{email}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<AnimalListing> getAnimalListingByMemberEmail(@PathParam("email") String emailAddress) {
        List<AnimalListing> animalListings = animalListingSessionBeanLocal.retrieveAnimalListingByMemberEmail(emailAddress);

        for (AnimalListing al : animalListings) {
            al.setMember(null);
            al.setApplicationForms(null);
        }

        return animalListings;

    }

    @DELETE
    @Path("/deleteAnimalListing/{animalListingId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteAnimalListingById(@PathParam("animalListingId") Long animalListingId) {
        try {
            animalListingSessionBeanLocal.deleteAnimalListing(animalListingId);
            return Response.status(204).build();
        } catch (AnimalListingHasApplicationFormException | ListingNotFoundException | DeleteAnimalListingException | MemberNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    } //end deleteField
*/
}
