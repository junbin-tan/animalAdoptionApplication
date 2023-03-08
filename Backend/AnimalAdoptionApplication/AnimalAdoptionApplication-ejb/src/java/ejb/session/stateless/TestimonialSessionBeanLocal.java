/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Testimonial;
import exception.InputDataValidationException;
import exception.TestimonialNotFoundException;
import exception.UnknownPersistenceException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author limwe
 */
@Local
public interface TestimonialSessionBeanLocal {

    public Long createTestimonial(Testimonial newTestimonial) throws UnknownPersistenceException, InputDataValidationException;

    public Testimonial retrieveTestimonialById(Long id) throws TestimonialNotFoundException;

    public List<Testimonial> retrieveTestimonialbyDonationId(Long donationId) throws TestimonialNotFoundException;

    public void deleteTestimonial(Testimonial testimonial) throws TestimonialNotFoundException;
    
}
