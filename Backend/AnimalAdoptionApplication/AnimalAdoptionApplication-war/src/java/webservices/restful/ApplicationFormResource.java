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
import entity.FormTypeEnum;
import entity.Member;
import entity.SleepAreaEnum;
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
//            ApplicationForm appForm = new ApplicationForm();
//            appForm.setIsFirstTime(o.getBoolean("isFirstTime"));
//            appForm.setHasOtherPets(o.getBoolean("hasOtherPets"));
//            appForm.setExistingPetsOwned(o.getInt("existingPetsOwned"));
//            appForm.setHasDailyExercise(o.getBoolean("hasDailyExercise"));
//            String sleepAreaString = o.getString("sleepArea");
//            SleepAreaEnum sleepArea = SleepAreaEnum.valueOf(sleepAreaString);
//            appForm.setSleepArea(sleepArea);
//            appForm.setPetAloneTime(o.getInt("petAloneTime"));
//            appForm.setReason(o.getString("reason"));
//            String formTypeString = o.getString("formType");
//            FormTypeEnum formType = FormTypeEnum.valueOf(formTypeString);
//            appForm.setFormType(formType);

            
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
    
}
