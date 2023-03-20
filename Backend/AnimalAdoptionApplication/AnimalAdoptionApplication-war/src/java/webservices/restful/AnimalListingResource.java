/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import ejb.session.stateless.AnimalListingSessionBeanLocal;
import entity.AnimalListing;
import entity.Member;
import entity.Testimonial;
import exception.InputDataValidationException;
import exception.ListingExistException;
import exception.ListingNotFoundException;
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
    public Response createAnimalListing(AnimalListing newAnimalListing) {
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
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<AnimalListing> getAllAnimalListings() {
            List<AnimalListing> allAnimalListings = animalListingSessionBeanLocal.retrieveAllAnimalListings();

            for (AnimalListing al : allAnimalListings) {
                    al.getMember().setAnimalListings(null);
                    al.setApplicationForms(null);
            }

            return allAnimalListings;
            
    } 
}
