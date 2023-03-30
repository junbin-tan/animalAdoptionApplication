/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Donation;
import entity.Member;
import entity.Testimonial;
import exception.InputDataValidationException;
import exception.UnknownPersistenceException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author alwin
 */
@Local
public interface DonationSessionBeanLocal {

    public Long createNewDonation(Donation newDonation) throws UnknownPersistenceException, InputDataValidationException;

    public Long createNewTestimonial(Testimonial newTestimonial) throws UnknownPersistenceException, InputDataValidationException;

    public long setDonationToTestimonial(Long donationId, Long testId);

    public void setTestimonialToDonation(Long donationId, Long testId);

    public List<Member> getMemberByEmail(String email);

    public List<Donation> retrieveAllDonations();



}
