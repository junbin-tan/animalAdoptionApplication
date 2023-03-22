/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import ejb.session.stateless.AnimalListingSessionBeanLocal;
import ejb.session.stateless.ApplicationFormSessionBeanLocal;
import ejb.session.stateless.MemberSessionBeanLocal;
import entity.ApplicationForm;
import exception.ApplicationFormExistException;
import exception.ApplicationNotFoundException;
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
    
    @EJB
    private MemberSessionBeanLocal memberSessionBeanLocal;

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
            Long applicationFormId = applicationFormSessionBeanLocal.createNewApplication(appForm, appForm.getMember(), appForm.getAnimalListing());
            
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
    
    @GET
    @Path("/getApplicationFormByMemberEmail/{email}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<ApplicationForm> getApplicationFormByMemberEmail(@PathParam("email") String emailAddress) {
        List<ApplicationForm> applicationForms = applicationFormSessionBeanLocal.retrieveApplicationFormsByMemberEmail(emailAddress);

        for (ApplicationForm af : applicationForms) {
            af.setMember(null);
            af.setAnimalListing(null);
        }

        return applicationForms;

    }

    @DELETE
    @Path("/deleteApplicationForm/{applicationFormId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteApplicationFormById(@PathParam("applicationFormId") Long applicationFormId) {
        try {
            applicationFormSessionBeanLocal.deleteApplicationForm(applicationFormId);
            return Response.status(204).build();
            
        } catch (ApplicationNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    } //end deleteApplicationForm
}
