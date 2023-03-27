/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.singleton;

import ejb.session.stateless.AdminSessionBeanLocal;
import ejb.session.stateless.MemberSessionBeanLocal;
import entity.AccountStatusEnum;
import entity.Admin;
import entity.Member;
import entity.ResidentialTypeEnum;
import exception.AdminNotFoundException;
import exception.InputDataValidationException;
import exception.MemberExistsException;
import exception.UnknownPersistenceException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.LocalBean;
import javax.ejb.Startup;

/**
 *
 * @author Jun Bin
 */
@Singleton
@LocalBean
@Startup
public class DataInitSessionBean {

    @EJB
    private MemberSessionBeanLocal memberSessionBean;

    @EJB
    private AdminSessionBeanLocal adminSessionBean;
    
    

    @PostConstruct
    public void postConstruct() {
        initializeData();
        
    }
    
     private void initializeData() {
        try {
            Admin newAdmin = new Admin();
            newAdmin.setFirstName("adminFirst");
            newAdmin.setLastName("adminLast");
            newAdmin.setEmail("admin1@pawfect.com");
            newAdmin.setPassword("password");
            adminSessionBean.createAdmin(newAdmin);
            
//            Member newMember = new Member();
//            newMember.setName("membber1");
//            newMember.setEmail("member1@gmail.com");
//            newMember.setPassword("password");
//            newMember.setPhoneNumber("99999999");
//            newMember.setOpenToAdopt(Boolean.TRUE);
//            newMember.setOpenToAdopt(Boolean.TRUE);
//            newMember.setLocation("Singapore");
//            newMember.setOccupation("Doctor");
//            newMember.setResidentialType(ResidentialTypeEnum.LANDED);
//            newMember.setAccountStatus(AccountStatusEnum.VERIFIED);
//            memberSessionBean.createMember(newMember);
        } catch (UnknownPersistenceException  ex) {
            ex.printStackTrace();
        } catch (InputDataValidationException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
}
