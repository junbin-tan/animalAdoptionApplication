/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import ejb.session.stateless.MemberSessionBeanLocal;
import entity.AnimalListing;
import entity.ApplicationForm;
import entity.Donation;
import entity.EventField;
import entity.EventListing;
import entity.EventRegistration;
import entity.Member;
import entity.Notification;
import entity.Review;
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
            Member member = memberSessionBeanLocal.memberLogin(o.getString("email"), o.getString("password"));
            //Nullifying relationships related to member
//            nullifyMemberRelationships(member);
            member.setReviewsCreated(null);
            member.setReviewsReceived(null);
            member.setEventListings(null);
            member.setEventRegistrations(null);
            member.setAnimalListings(null);
            member.setApplicationForms(null);
            member.setDonations(null);
            member.setNotifications(null);

            return Response.status(200).entity(member).build();
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
                Member member = memberSessionBeanLocal.retrieveMemberByEmail(email);

                //Nullifying relationships related to member
//                nullifyMemberRelationships(member);
                member.setReviewsCreated(null);
                member.setReviewsReceived(null);
                member.setEventListings(null);
                member.setEventRegistrations(null);
                member.setAnimalListings(null);
                member.setApplicationForms(null);
                member.setDonations(null);
                member.setNotifications(null);

                return Response.status(200).entity(member).build();
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
    @Path("/getAllMembers")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllMembers(@Context HttpHeaders headers) {

        List<String> authHeaders = headers.getRequestHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeaders != null ? authHeaders.get(0).split(" ")[1] : null;
        boolean validToken = AdminJwtVerification.verifyJwtToken(token);
        String msg = "";
        if (validToken) {
            msg = "User calling this is a verified Userfront user. YAY!";
            List<Member> members = memberSessionBeanLocal.retrieveAllMembers();

            // nullify relationships
            for (Member member : members) {
                member.setReviewsCreated(null);
                member.setReviewsReceived(null);
                member.setEventListings(null);
                member.setEventRegistrations(null);
                member.setAnimalListings(null);
                member.setApplicationForms(null);
                member.setDonations(null);
                member.setNotifications(null);
            }

            return Response.status(200).entity(members).build();
        } else {
            msg = "Invalid Userfront user! Go away!";
            JsonObject exception = Json.createObjectBuilder().add("error", msg).build();
            return Response.status(404).entity(exception).type(MediaType.APPLICATION_JSON).build();
        }

    }

    @GET
    @Path("/getChatRecipients/{email}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getChatRecipients(@Context HttpHeaders headers, @PathParam("email") String email) {

        List<String> authHeaders = headers.getRequestHeader(HttpHeaders.AUTHORIZATION);
        String token = authHeaders != null ? authHeaders.get(0).split(" ")[1] : null;
        boolean validToken = JwtVerification.verifyJwtToken(token);
        String msg = "";
        if (validToken) {
            msg = "User calling this is a verified Userfront user. YAY!";
            List<Member> members;
            try {
                members = memberSessionBeanLocal.retrieveMembersByApplicationFormAndAnimalListing(email);
                // nullify relationships
                for (Member member : members) {
                    member.setReviewsCreated(null);
                    member.setReviewsReceived(null);
                    member.setEventListings(null);
                    member.setEventRegistrations(null);
                    member.setAnimalListings(null);
                    member.setApplicationForms(null);
                    member.setDonations(null);
                    member.setNotifications(null);
                }

                return Response.status(200).entity(members).build();
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

    // method to nullify member relationships
    private void nullifyMemberRelationships(Member member) {
        //Nullifying relationships related to member
        List<AnimalListing> animalListingsToNullify = member.getAnimalListings();
        for (AnimalListing aL : animalListingsToNullify) {
            aL.setMember(null);
        }
        List<Review> reviewsCreatedToNullify = member.getReviewsCreated();
        for (Review r : reviewsCreatedToNullify) {
            r.setBelongedToMember(null);
            r.setReviewedByMember(null);
        }
        List<Review> reviewsReceuvedToNullify = member.getReviewsReceived();
        for (Review r : reviewsReceuvedToNullify) {
            r.setBelongedToMember(null);
            r.setReviewedByMember(null);
        }
        List<EventListing> eventListingToNullify = member.getEventListings();
        for (EventListing e : eventListingToNullify) {
            e.setMember(null);
            for (EventField ef : e.getEventFields()) {
                ef.setEventListing(null);
            }
        }
        List<EventRegistration> eventRegistrationToNullify = member.getEventRegistrations();
        for (EventRegistration e : eventRegistrationToNullify) {
            e.setMember(null);
        }
        List<ApplicationForm> appFormsToNullify = member.getApplicationForms();
        for (ApplicationForm aF : appFormsToNullify) {
            aF.setMember(null);
        }
        List<Donation> donationsToNullify = member.getDonations();
        for (Donation d : donationsToNullify) {
            d.setMember(null);
            d.getTestimonial().setDonation(null);
        }
        List<Notification> notificationsToNullify = member.getNotifications();
        for (Notification n : notificationsToNullify) {
            n.setMember(null);
        }
    }

}
