/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import ejb.session.stateless.MemberSessionBeanLocal;
import entity.Member;
import exception.InputDataValidationException;
import exception.InvalidLoginCredentialException;
import exception.MemberExistsException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author jiawe
 */
@Path("member")
public class MembersResource {

    @EJB
    private MemberSessionBeanLocal memberSessionBeanLocal;

    @Context
    private UriInfo context;

    public MembersResource() {
    }

    @POST
    @Path("/createMember")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createMember(Member newMember) {
        try {
            Long memId = memberSessionBeanLocal.createMember(newMember);
            Member m = memberSessionBeanLocal.retrieveMemberByMemberId(memId);
            return Response.status(200).entity(m).build();
        } catch (UnknownPersistenceException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Unknown Persistence Exception occurred.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();

        } catch (InputDataValidationException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Input Data Validation Exception occurred.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();

        } catch (MemberExistsException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", "Member already exists.").build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        } catch (MemberNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(JsonObject o) {
        try {
            Member m = memberSessionBeanLocal.memberLogin(o.getString("email"), o.getString("password"));
            return Response.status(200).entity(m).build();
        } catch (InvalidLoginCredentialException ex) {
            JsonObject exception = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }
    }

    @GET
    @Path("/getMember/{email}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMember(@Context HttpHeaders headers, @PathParam("email") String email) {
        List<String> authHeaders = headers.getRequestHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeaders != null ? authHeaders.get(0).split(" ")[1] : null;
        boolean validToken = JwtVerification.verifyJwtToken(token);
        String msg = "";
        if (validToken) {
            msg = "User calling this is a verified Userfront user. YAY!";
            try {
                Member mToNullify = memberSessionBeanLocal.retrieveMemberByEmail(email);
                //Nullifying all relationship to member (this one got error)
//                mToNullify.setReviewsCreated(null);
//                mToNullify.setReviewsReceived(null);
//                mToNullify.setEventListings(null);
//                mToNullify.setEventRegistrations(null);
//                mToNullify.setAnimalListings(null);
//                mToNullify.setApplicationForms(null);
//                mToNullify.setDonations(null);
//                mToNullify.setNotifications(null); 
//                
                return Response.status(200).entity(mToNullify).build();
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

}
