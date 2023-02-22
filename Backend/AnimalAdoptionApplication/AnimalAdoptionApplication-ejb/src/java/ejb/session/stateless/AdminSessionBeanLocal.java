/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Admin;
import exception.AdminExistsException;
import exception.InputDataValidationException;
import exception.UnknownPersistenceException;
import javax.ejb.Local;

/**
 *
 * @author yijie
 */
@Local
public interface AdminSessionBeanLocal {
    
//    public Long createAdmin(Admin newAdmin) throws AdminExistsException, UnknownPersistenceException, InputDataValidationException;
//    
//    public Admin retrieveAdminBy
//    
}
