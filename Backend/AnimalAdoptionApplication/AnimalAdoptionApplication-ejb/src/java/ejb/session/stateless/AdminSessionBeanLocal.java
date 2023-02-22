/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Admin;
import exception.AdminNotFoundException;
import exception.InputDataValidationException;
import exception.UnknownPersistenceException;
import javax.ejb.Local;

/**
 *
 * @author yijie
 */
@Local
public interface AdminSessionBeanLocal {
    
    public Long createAdmin(Admin newAdmin) throws UnknownPersistenceException, InputDataValidationException;
    
    public Admin retrieveAdminByEmail(String emailAddress) throws AdminNotFoundException;
    
    public void updateAdmin (Admin admin) throws AdminNotFoundException;
    
    public void deleteAdmin (Admin admin) throws AdminNotFoundException;
     
}
