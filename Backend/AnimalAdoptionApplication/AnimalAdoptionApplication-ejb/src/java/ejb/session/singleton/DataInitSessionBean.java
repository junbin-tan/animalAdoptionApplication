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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
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
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm", Locale.ENGLISH);
            try {
                Date date1 = sdf.parse("2021-01-01 12:00");
                Date date2 = sdf.parse("2021-02-01 12:00");
                Date date3 = sdf.parse("2021-03-01 12:00");
                Date date4 = sdf.parse("2021-04-01 12:00");
                Date date5 = sdf.parse("2021-05-01 12:00");
                memberSessionBean.createMemberForInside("email1.com", date1);
                memberSessionBean.createMemberForInside("email6.com", date1);
                memberSessionBean.createMemberForInside("email7.com", date1);
                memberSessionBean.createMemberForInside("email8.com", date1);
                memberSessionBean.createMemberForInside("email9.com", date1);
                memberSessionBean.createMemberForInside("email10.com", date1);
                memberSessionBean.createMemberForInside("email11.com", date1);
                memberSessionBean.createMemberForInside("email12.com", date1);
                memberSessionBean.createMemberForInside("email2.com", date2);
                memberSessionBean.createMemberForInside("email222.com", date2);
                memberSessionBean.createMemberForInside("email2222.com", date2);
                memberSessionBean.createMemberForInside("email22222.com", date2);
                memberSessionBean.createMemberForInside("email222222.com", date2);
                memberSessionBean.createMemberForInside("email2222222.com", date2);
                memberSessionBean.createMemberForInside("email3.com", date3);
                memberSessionBean.createMemberForInside("email33.com", date3);
                memberSessionBean.createMemberForInside("email333.com", date3);
                memberSessionBean.createMemberForInside("email3333.com", date3);
                memberSessionBean.createMemberForInside("email4.com", date4);
                memberSessionBean.createMemberForInside("email44.com", date4);
                memberSessionBean.createMemberForInside("email5.com", date5);
                memberSessionBean.createMemberForInside("email55.com", date5);
            } catch (ParseException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            }
        } catch (UnknownPersistenceException ex) {
            ex.printStackTrace();
        } catch (InputDataValidationException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
