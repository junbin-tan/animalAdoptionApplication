/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Review;
import exception.InputDataValidationException;
import exception.RemoveReviewException;
import exception.ReviewNotFoundException;
import exception.UnknownPersistenceException;
import static java.lang.Boolean.TRUE;
import java.util.List;
import java.util.Set;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

/**
 *
 * @author limwe
 */
@Stateless
public class ReviewSessionBean implements ReviewSessionBeanLocal {

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    
    @PersistenceContext(unitName = "AnimalAdoptionApplication-ejbPU")
    private EntityManager em;

    
    private final ValidatorFactory validatorFactory;
    private final Validator validator;

    public ReviewSessionBean()
    {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }
    
    @Override
    public Long createReview(Review newReview) throws UnknownPersistenceException, InputDataValidationException {
        Set<ConstraintViolation<Review>>constraintViolations = validator.validate(newReview);
        if (constraintViolations.isEmpty()) {
            try {
                em.persist(newReview);
                em.flush();

                return newReview.getReviewId();

            } catch (PersistenceException ex) {
                throw new UnknownPersistenceException(ex.getMessage());
            }
            
        } else {
             throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
        } 
    }
    
    @Override
    public List<Review> retrieveReviewGivenByMemberbyMemberId (Long memberId) throws ReviewNotFoundException {
        Query query = em.createQuery("SELECT r FROM Review r WHERE r.reviewedByMember.memberId = :memberId AND r.isRemoved = FALSE ORDER BY r.date DESC");
        query.setParameter("memberId", memberId);
        
        List<Review> reviewToRetrieve = query.getResultList(); 
        
        if (reviewToRetrieve.size() == 0) {
            throw new ReviewNotFoundException("No reviews cannot be found.");
        
        } else {
            return reviewToRetrieve;
        }
    }
    
    @Override
    public List<Review> retrieveReviewBelongedToMemberbyMemberId (Long memberId) throws ReviewNotFoundException {
        Query query = em.createQuery("SELECT r FROM Review r WHERE r.belongedToMember.memberId = :memberId AND r.isRemoved = FALSE ORDER BY r.date DESC");
        query.setParameter("memberId", memberId);
        
        List<Review> reviewToRetrieve = query.getResultList(); 
        
        if (reviewToRetrieve.size() == 0) {
            throw new ReviewNotFoundException("No reviews cannot be found.");
        
        } else {
            return reviewToRetrieve;
        }
    }
    
    @Override
    public Review retrieveReviewByReviewId(Long reviewId) throws ReviewNotFoundException
    {
        Review review = em.find(Review.class, reviewId);
        
        if(review != null)
        {
            return review;
        }
        else
        {
            throw new ReviewNotFoundException("Review Id " + reviewId + " does not exist!");
        }               
    }
    
   @Override
    public void updateReviewToRemovebyId (Long reviewId) throws ReviewNotFoundException, InputDataValidationException
    {
        if(retrieveReviewByReviewId(reviewId) != null)
        {
            Set<ConstraintViolation<Review>>constraintViolations = validator.validate(retrieveReviewByReviewId(reviewId));
        
            if(constraintViolations.isEmpty())
            {
                Review reviewToUpdate = retrieveReviewByReviewId(reviewId);
                reviewToUpdate.setIsRemoved(TRUE);
            }                           
            else
            {
                throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
            }
        }  
        else
        {
            throw new ReviewNotFoundException("Review ID not valid for review to be updated");
        }
    }
    
    @Override
    public double retrieveMemberRatingbyMemberId (Long memberId) throws ReviewNotFoundException {
        Query query = em.createQuery("SELECT r FROM Review r WHERE r.belongedToMember.memberId = :memberId AND r.isRemoved = FALSE ORDER BY r.date DESC");
        query.setParameter("memberId", memberId);
        
        List<Review> reviewToRetrieve = query.getResultList(); 
        
        if (reviewToRetrieve.size() == 0) {
            throw new ReviewNotFoundException("No reviews cannot be found.");
        
        } else {
            double sumRating = 0;
            
            for(int i = 0 ;i < reviewToRetrieve.size(); i++) {
                 sumRating += reviewToRetrieve.get(i).getRating();           
            }
            
            return sumRating/reviewToRetrieve.size() ;
        }
    }
    
    
    
    private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<Review>>constraintViolations) {
        String msg = "Input data validation error!:";
            
        for(ConstraintViolation constraintViolation:constraintViolations) {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        return msg;
    }
    
}
