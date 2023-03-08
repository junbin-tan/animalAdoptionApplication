/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import ejb.session.stateless.NotificationSessionBeanLocal;
import entity.Notification;
import exception.InputDataValidationException;
import exception.MemberNotFoundException;
import exception.NotificationExistsException;
import exception.NotificationNotFoundException;
import exception.UnknownPersistenceException;
import exception.UpdateNotificationException;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
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
@Path("notification")
public class NotificationResource {
    @EJB
    private NotificationSessionBeanLocal notificationSessionBeanLocal;

    @Context
    private UriInfo context;
    
    @POST
    @Path("/{emailAddress}/createNotification")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createNotification(@PathParam("emailAddress") String emailAddress, Notification newNotif) {
        try {
            notificationSessionBeanLocal.createNewNotification(emailAddress, newNotif);
            return Response.status(204).build();
            
        } catch (UnknownPersistenceException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Unknown Persistence Exception occurred.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        
        } catch (InputDataValidationException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Input Data Validation Exception occurred.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        
        } catch (NotificationExistsException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Notification has already been sent.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
       
        } catch (MemberNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Member not found.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    @PUT
    @Path("/{notificationId}/updateNotification")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateNotification(@PathParam("notificationId") Long notificationId, Notification updatedNotification) {
        updatedNotification.setNotificationId(notificationId);

        try {
            notificationSessionBeanLocal.updateNotification(updatedNotification);
            return Response.status(204).build();
            
        } catch (NotificationNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Notification not found.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        
        } catch (UpdateNotificationException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Notification cannot be updated due to errors.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        
        } catch (InputDataValidationException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Input Data Validation Exception occurred.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
        
    }

}
