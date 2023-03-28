/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Enquiry;
import exception.InputDataValidationException;
import exception.UnknownPersistenceException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author yijie
 */
@Local
public interface EnquirySessionBeanLocal {
    
    public Long createEnquiry(Enquiry newEnquiry) throws UnknownPersistenceException, InputDataValidationException;

     public List<Enquiry> retrieveAllEnquirys();
    
}
