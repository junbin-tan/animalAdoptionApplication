/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.AnimalListing;
import entity.ApplicationForm;
import entity.ApplicationStatusEnum;
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
import java.util.stream.Collectors;
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
import ejb.session.stateless.AnimalListingSessionBeanLocal;

/**
 *
 * @author yijie
 */
@Path("animalListing")
public class AnimalListingResource {

    @EJB
    private AnimalListingSessionBeanLocal animalListingSessionBeanLocal;

    @Context
    private UriInfo context;

    public AnimalListingResource() {
    }

    @POST
    @Path("/createAnimalListing")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAnimalListing(@Context HttpHeaders headers, AnimalListing newAnimalListing) {

        List<String> authHeaders = headers.getRequestHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeaders != null ? authHeaders.get(0).split(" ")[1] : null;
        boolean validToken = JwtVerification.verifyJwtToken(token);
        String msg = "";
        if (validToken) {
            msg = "User calling this is a verified Userfront user. YAY!";

            try {
                Long animalListingId = animalListingSessionBeanLocal.createAnimalListing(newAnimalListing);
                return Response.status(204).build();

            } catch (UnknownPersistenceException ex) {
                JsonObject exception = Json.createObjectBuilder().add("error", "Unknown Persistence Exception occurred.").build();
                return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();

            } catch (InputDataValidationException ex) {
                JsonObject exception = Json.createObjectBuilder().add("error", "Input Data Validation Exception occurred.").build();
                return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();

            } catch (ListingExistException ex) {
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
    @Produces(MediaType.APPLICATION_JSON)
    public List<AnimalListing> getAllAnimalListings() {
        List<AnimalListing> allAnimalListings = animalListingSessionBeanLocal.retrieveAllAnimalListings();

        for (AnimalListing al : allAnimalListings) {
            al.getMember().setAnimalListings(null);
            al.getMember().setDonations(null);
            al.getMember().setEventListings(null);
            al.getMember().setEventRegistrations(null);
            al.getMember().setNotifications(null);
            al.getMember().setReviewsCreated(null);
            al.getMember().setReviewsReceived(null);

            for (ApplicationForm af : al.getApplicationForms()) {
                af.setAnimalListing(null);
                af.setMember(null);
            }
        }

        // must do filter to display available animal listings after nullify relationships above here
        // if not won't work, can't do it in session bean also
        // Logic: only display animal listing that are not yet completed/accepted
        allAnimalListings = allAnimalListings.stream().filter(al -> {
            boolean isStillAvailable = true;
            for (ApplicationForm af : al.getApplicationForms()) {
                if (af != null && ((af.getApplicationStatus() != ApplicationStatusEnum.SUBMITTED && af.getApplicationStatus() != ApplicationStatusEnum.REJECTED) && (af.getApplicationStatus() != ApplicationStatusEnum.SUBMITTED))) {
                    isStillAvailable = false;
                }
            }
            return isStillAvailable;
        }).collect(Collectors.toList());

        return allAnimalListings;

    }

    @GET
    @Path("/getAllAnimalListingsAdmin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllAnimalListingsAdmin(@Context HttpHeaders headers) {

        List<String> authHeaders = headers.getRequestHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeaders != null ? authHeaders.get(0).split(" ")[1] : null;
        boolean validToken = AdminJwtVerification.verifyJwtToken(token);
        String msg = "";
        if (validToken) {
            msg = "User calling this is a verified Userfront user. YAY!";

            List<AnimalListing> allAnimalListings = animalListingSessionBeanLocal.retrieveAllAnimalListings();

            for (AnimalListing al : allAnimalListings) {
                al.getMember().setAnimalListings(null);
                al.getMember().setDonations(null);
                al.getMember().setEventListings(null);
                al.getMember().setEventRegistrations(null);
                al.getMember().setNotifications(null);
                al.getMember().setReviewsCreated(null);
                al.getMember().setReviewsReceived(null);

                for (ApplicationForm af : al.getApplicationForms()) {
                    af.setAnimalListing(null);
                    af.setMember(null);
                }
            }

            return Response.status(200).entity(allAnimalListings).build();
        } else {
            msg = "Invalid Userfront user! Go away!";
            JsonObject exception = Json.createObjectBuilder().add("error", msg).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }

    }

    @GET
    @Path("/getAnimalListingByMemberEmail/{email}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAnimalListingByMemberEmail(@Context HttpHeaders headers, @PathParam("email") String emailAddress) {

        List<String> authHeaders = headers.getRequestHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeaders != null ? authHeaders.get(0).split(" ")[1] : null;
        boolean validToken = JwtVerification.verifyJwtToken(token);
        String msg = "";
        if (validToken) {
            msg = "User calling this is a verified Userfront user. YAY!";

            List<AnimalListing> animalListings = animalListingSessionBeanLocal.retrieveAnimalListingByMemberEmail(emailAddress);

            for (AnimalListing al : animalListings) {
                al.setMember(null);
                for (ApplicationForm af : al.getApplicationForms()) {
                    af.setAnimalListing(null);

                    // need to retrieve member on each app form to know who submittted it
                    // so set inverse member relationship to null
                    af.getMember().setAnimalListings(null);
                    af.getMember().setDonations(null);
                    af.getMember().setEventListings(null);
                    af.getMember().setEventRegistrations(null);
                    af.getMember().setNotifications(null);
                    af.getMember().setReviewsCreated(null);
                    af.getMember().setReviewsReceived(null);
                    af.getMember().setApplicationForms(null);
                }
            }

            return Response.status(200).entity(animalListings).build();

        } else {
            msg = "Invalid Userfront user! Go away!";
            JsonObject exception = Json.createObjectBuilder().add("error", msg).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }

    }

    @DELETE
    @Path("/deleteAnimalListing/{animalListingId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteAnimalListingById(@Context HttpHeaders headers, @PathParam("animalListingId") Long animalListingId) {

        List<String> authHeaders = headers.getRequestHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeaders != null ? authHeaders.get(0).split(" ")[1] : null;
        boolean validToken = JwtVerification.verifyJwtToken(token);
        String msg = "";
        if (validToken) {
            msg = "User calling this is a verified Userfront user. YAY!";

            try {
                animalListingSessionBeanLocal.deleteAnimalListing(animalListingId);
                return Response.status(204).build();
            } catch (AnimalListingHasApplicationFormException | ListingNotFoundException | DeleteAnimalListingException | MemberNotFoundException ex) {
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

    } //end deleteField

}
