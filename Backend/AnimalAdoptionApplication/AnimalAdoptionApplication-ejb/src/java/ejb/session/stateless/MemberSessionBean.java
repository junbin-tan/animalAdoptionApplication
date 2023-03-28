/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.AccountStatusEnum;
import entity.AnimalListing;
import entity.ApplicationForm;
import entity.Donation;
import entity.EventListing;
import entity.EventRegistration;
import entity.Member;
import entity.ResidentialTypeEnum;
import entity.Review;
import exception.DeleteMemberException;
import exception.InputDataValidationException;
import exception.InvalidLoginCredentialException;
import exception.MemberExistsException;
import exception.MemberNotFoundException;
import exception.UnknownPersistenceException;
import exception.UpdateMemberException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.TimeZone;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

/**
 *
 * @author Jun Bin
 */
@Stateless
public class MemberSessionBean implements MemberSessionBeanLocal {

    @PersistenceContext(unitName = "AnimalAdoptionApplication-ejbPU")
    private EntityManager em;

    
    private final ValidatorFactory validatorFactory;
    private final Validator validator;

    public MemberSessionBean()
    {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }
    
    @Override
    public Member memberLogin(String email, String password) throws InvalidLoginCredentialException {
        try {
            Member member = retrieveMemberByEmail(email);
            
            if (member.getPassword().equals(password)) {
                member.getReviewsCreated().size();
                member.getReviewsReceived().size();
                member.getEventListings().size();
                member.getEventRegistrations().size();
                member.getAnimalListings().size();
                member.getApplicationForms().size();
                member.getDonations().size();
                member.getNotifications().size();
                
                return member;
            } else {
                throw new InvalidLoginCredentialException("Email does not exist or invalid password!");
            }
        } catch (MemberNotFoundException ex) {
            throw new InvalidLoginCredentialException("Email does not exist or invalid password!");
        }
    }
    
    
    @Override
    public Long createMember(Member newMember) throws MemberExistsException, UnknownPersistenceException, InputDataValidationException
    {
        Set<ConstraintViolation<Member>>constraintViolations = validator.validate(newMember);
        
        if(constraintViolations.isEmpty())
        {
            try
            {
                //adding the creation date
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm", Locale.ENGLISH);
                TimeZone tz = TimeZone.getTimeZone("Asia/Singapore");
                sdf.setTimeZone(tz);
                java.util.Date date = new java.util.Date();
                newMember.setCreateDate(date);
                em.persist(newMember);
                em.flush();

                return newMember.getMemberId();
            }
            catch(PersistenceException ex)
            {
                if(ex.getCause() != null && ex.getCause().getClass().getName().equals("org.eclipse.persistence.exceptions.DatabaseException"))
                {
                    if(ex.getCause().getCause() != null && ex.getCause().getCause().getClass().getName().equals("java.sql.SQLIntegrityConstraintViolationException"))
                    {
                        throw new MemberExistsException();
                    }
                    else
                    {
                        throw new UnknownPersistenceException(ex.getMessage());
                    }
                }
                else
                {
                    throw new UnknownPersistenceException(ex.getMessage());
                }
            }
        }
        else
        {
            throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
        }
    }
    
    @Override
    public void createMemberForInside(String email, Date createDate) 
    {     
        Member newMember = new Member();
        newMember.setName("testerName");
        newMember.setEmail(email);
        newMember.setPassword("passowrd");
        newMember.setPhoneNumber("98000000");
        newMember.setOpenToAdopt(Boolean.TRUE);
        newMember.setOpenToFoster(Boolean.TRUE);
        newMember.setLocation("Location");
        newMember.setOccupation("DOCTOR");
        newMember.setResidentialType(ResidentialTypeEnum.LANDED);
        newMember.setAccountStatus(AccountStatusEnum.VERIFIED);
        newMember.setCreateDate(createDate);
        em.persist(newMember);
        em.flush();
    }
    
    
    
    
    

    @Override
    public List<Member> retrieveAllMembers()
    {
        Query query = em.createQuery("SELECT m FROM Member m ORDER BY m.memberId ASC");
        
        return query.getResultList();
    }
    
    
    @Override
    public Member retrieveMemberByMemberId(Long memberId) throws MemberNotFoundException
    {
        Member member = em.find(Member.class, memberId);
        
        if(member != null)
        {
            return member;
        }
        else
        {
            throw new MemberNotFoundException("Member ID " + memberId + " does not exist!");
        }               
    }
    
    @Override
    public Member retrieveMemberByEmail(String email) throws MemberNotFoundException
    {
        Query query = em.createQuery("SELECT m FROM Member m WHERE m.email = :inEmail");
        query.setParameter("inEmail", email);
        
        try
        {
            return (Member)query.getSingleResult();
        }
        catch(NoResultException | NonUniqueResultException ex)
        {
            throw new MemberNotFoundException("Email" + email + " does not exist!");
        }
    }
    
    @Override
    public void updateMember(Member oldMember) throws MemberNotFoundException, UpdateMemberException, InputDataValidationException
    {
        if(oldMember != null && oldMember.getMemberId()!= null)
        {
            Set<ConstraintViolation<Member>>constraintViolations = validator.validate(oldMember);
        
            if(constraintViolations.isEmpty())
            {
                Member memberToUpdate = retrieveMemberByMemberId(oldMember.getMemberId());

                if(memberToUpdate.getMemberId().equals(oldMember.getMemberId()))
                {
                    memberToUpdate.setName(oldMember.getName());
                    memberToUpdate.setEmail(oldMember.getEmail());
                    memberToUpdate.setPassword(oldMember.getPassword());
                    memberToUpdate.setPhoneNumber(oldMember.getPhoneNumber());
                    memberToUpdate.setOpenToFoster(oldMember.getOpenToFoster());
                    memberToUpdate.setOpenToAdopt(oldMember.getOpenToAdopt());
                    memberToUpdate.setLocation(oldMember.getLocation());
                    memberToUpdate.setOccupation(oldMember.getOccupation());
                    memberToUpdate.setResidentialType(oldMember.getResidentialType());
                    memberToUpdate.setAccountStatus(oldMember.getAccountStatus());
                }
                else
                {
                    throw new UpdateMemberException("Member to be updated does not match the existing record");
                }
            }
            else
            {
                throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
            }
        }
        else
        {
            throw new MemberNotFoundException("Member ID not provided for member to be updated");
        }
    }
    
    
    
    public void deleteMember(Long memberId) throws MemberNotFoundException, DeleteMemberException
    {
        Member memberToRemove = retrieveMemberByMemberId(memberId);
        
        List<Review> reviewsCreated = memberToRemove.getReviewsCreated();
        List<Review> reviewsReceived = memberToRemove.getReviewsReceived();
        List<EventListing> eventListing = memberToRemove.getEventListings();
        List<EventRegistration> eventRegistration = memberToRemove.getEventRegistrations();
        List<AnimalListing> animalListing = memberToRemove.getAnimalListings();
        List<ApplicationForm> applicationForms = memberToRemove.getApplicationForms();
        //List<Donation> donations = memberToRemove.getDonations();
        
        
        /*
		if(reviewsCreated.isEmpty() && reviewsReceived.isEmpty() && eventListing.isEmpty() && eventRegistration.isEmpty() && animalListing.isEmpty() && applicationForms.isEmpty() && donations.isEmpty())
        {
            em.remove(memberToRemove);
        }
        else
        {
            throw new DeleteMemberException("Member ID " + memberId + " is associated with existing items and cannot be deleted!");
        }
		*/
    }
    
    private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<Member>>constraintViolations) {
        String msg = "Input data validation error!:";
            
        for(ConstraintViolation constraintViolation:constraintViolations) {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        return msg;
    }
    
}
