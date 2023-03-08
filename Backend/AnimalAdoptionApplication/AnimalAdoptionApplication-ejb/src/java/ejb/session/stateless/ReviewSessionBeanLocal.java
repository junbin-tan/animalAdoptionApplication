/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Review;
import exception.InputDataValidationException;
import exception.ReviewNotFoundException;
import exception.UnknownPersistenceException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author limwe
 */
@Local
public interface ReviewSessionBeanLocal {

    public Long createReview(Review newReview) throws UnknownPersistenceException, InputDataValidationException;

    public List<Review> retrieveReviewGivenByMemberbyMemberId(Long memberId) throws ReviewNotFoundException;

    public List<Review> retrieveReviewBelongedToMemberbyMemberId(Long memberId) throws ReviewNotFoundException;

    public Review retrieveReviewByReviewId(Long reviewId) throws ReviewNotFoundException;

    public void updateReviewToRemovebyId(Long reviewId) throws ReviewNotFoundException, InputDataValidationException;

    public double retrieveMemberRatingbyMemberId(Long memberId) throws ReviewNotFoundException;
    
}
