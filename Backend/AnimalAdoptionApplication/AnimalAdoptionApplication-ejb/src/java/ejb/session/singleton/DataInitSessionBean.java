/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.singleton;

import ejb.session.stateless.AdminSessionBeanLocal;
import ejb.session.stateless.AnimalListingSessionBeanLocal;
import ejb.session.stateless.ApplicationFormSessionBeanLocal;
import ejb.session.stateless.DonationSessionBeanLocal;
import ejb.session.stateless.EnquirySessionBeanLocal;
import ejb.session.stateless.EventListingSessionBeanLocal;
import ejb.session.stateless.EventRegistrationSessionBeanLocal;
import ejb.session.stateless.MemberSessionBeanLocal;
import entity.AccountStatusEnum;
import entity.Admin;
import entity.AnimalListing;
import entity.AnimalTypeEnum;
import entity.Enquiry;
import entity.EventListing;
import entity.EventTypeEnum;
import entity.GenderEnum;
import entity.Member;
import entity.ResidentialTypeEnum;
import exception.AdminNotFoundException;
import exception.InputDataValidationException;
import exception.ListingExistException;
import exception.MemberExistsException;
import exception.MemberNotFoundException;
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
    private DonationSessionBeanLocal donationSessionBean;

    @EJB
    private EventRegistrationSessionBeanLocal eventRegistrationSessionBean;

    @EJB
    private EventListingSessionBeanLocal eventListingSessionBean;

    @EJB
    private ApplicationFormSessionBeanLocal applicationFormSessionBean;

    @EJB
    private AnimalListingSessionBeanLocal animalListingSessionBean;

    @EJB
    private EnquirySessionBeanLocal enquirySessionBean;

    @EJB
    private MemberSessionBeanLocal memberSessionBean;

    @EJB
    private AdminSessionBeanLocal adminSessionBean;

    @PostConstruct
    public void postConstruct() {

        try {
            adminSessionBean.retrieveAdminByEmail("admin1@pawfect.com");
            memberSessionBean.retrieveMemberByEmail("abc@gmail.com");
        } catch (AdminNotFoundException | MemberNotFoundException ex) {
            initializeData();
        }

    }

    private void initializeData() {
        try {
            // init admin
            Admin newAdmin = new Admin();
            newAdmin.setFirstName("adminFirst");
            newAdmin.setLastName("adminLast");
            newAdmin.setEmail("admin1@pawfect.com");
            newAdmin.setPassword("password");
            adminSessionBean.createAdmin(newAdmin);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm", Locale.ENGLISH);
            SimpleDateFormat sdfDateOnly = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
            try {
                String StringCreateDate = sdf.format(new Date());
                Date date1 = sdf.parse("2023-01-01 12:00");
                Date date2 = sdf.parse("2023-02-01 12:00");
                Date date3 = sdf.parse("2023-03-01 12:00");
                Date createDate = sdf.parse(StringCreateDate);
                // init members (members from userfront)
                memberSessionBean.createMemberForInside("abc@gmail.com", "abc", date1);
                memberSessionBean.createMemberForInside("aur@gmail.com", "aur", date1);
                memberSessionBean.createMemberForInside("jane@gmail.com", "jane", date2);
                memberSessionBean.createMemberForInside("bob@gmail.com", "bob", date3);
                memberSessionBean.createMemberForInside("qwerty@gmail.com", "qwerty", date3);
                
                // init enquiries
                Enquiry enq = new Enquiry();
                enq.setCreateDate(createDate);
                enq.setEmail("abc@gmail.com");
                enq.setMessage("Please help thx");
                enq.setName("abc");
                
                Enquiry enq2 = new Enquiry();
                enq2.setCreateDate(createDate);
                enq2.setEmail("aur@gmail.com");
                enq2.setMessage("Please help thxx");
                enq2.setName("aur");
                
                Enquiry enq3 = new Enquiry();
                enq3.setCreateDate(createDate);
                enq3.setEmail("jane@gmail.com");
                enq3.setMessage("Please help thxxxx");
                enq3.setName("jane");
                
                enquirySessionBean.createEnquiry(enq);
                enquirySessionBean.createEnquiry(enq2);
                enquirySessionBean.createEnquiry(enq3);
                
                // init animal listings
                AnimalListing al = new AnimalListing();
                al.setAge(3);
                al.setAnimalType(AnimalTypeEnum.CAT);
                al.setBreed("British short cat");
                al.setCreateDate(createDate);
                al.setDescription("Meet our adorable British Shorthair cat, a charming and affectionate feline with a distinctly British personality!");
                al.setFlatFee(100.0);
                al.setGender(GenderEnum.MALE);
                al.setImage("https://pawfect.s3.ap-southeast-1.amazonaws.com/animalListings/demo1%40gmail.com_2023-04-06T05%3A21%3A23.385Z_img01.jpeg");
                al.setIsActive(Boolean.TRUE);
                al.setIsAdoption(Boolean.TRUE);
                al.setIsFostering(Boolean.FALSE);
                al.setIsNeutered(Boolean.TRUE);
                al.setName("flower");
                al.setWeight(5.6);
                Member memAbc = memberSessionBean.retrieveMemberByEmail("abc@gmail.com");
                al.setMember(memAbc);
                animalListingSessionBean.createAnimalListing(al);
                
                
                AnimalListing al2 = new AnimalListing();
                al2.setAge(1);
                al2.setAnimalType(AnimalTypeEnum.RABBIT);
                al2.setBreed("Grey Rabbit");
                al2.setCreateDate(createDate);
                al2.setDescription("Meet our cute grey rabbit, ready for a loving home.");
                al2.setFlatFee(100.0);
                al2.setGender(GenderEnum.FEMALE);
                al2.setImage("https://pawfect.s3.ap-southeast-1.amazonaws.com/animalListings/member18%40gmail.com_2023-04-05T07%3A29%3A44.866Z_img08.jpeg");
                al2.setIsActive(Boolean.TRUE);
                al2.setIsAdoption(Boolean.TRUE);
                al2.setIsFostering(Boolean.FALSE);
                al2.setIsNeutered(Boolean.TRUE);
                al2.setName("greylo");
                al2.setWeight(2.3);
                Member memJane = memberSessionBean.retrieveMemberByEmail("jane@gmail.com");
                al2.setMember(memJane);
                animalListingSessionBean.createAnimalListing(al2);
                
                
                // init event listing
                EventListing event1 = new EventListing();
                event1.setCapacity(30.0);
                event1.setCreateDate(createDate);
                event1.setDateAndTime(sdfDateOnly.parse("2023-04-27"));
                event1.setDescription("Join our Corgi Beach Day in 2023 for fun in the sun with your furry friends!");
                event1.setEventName("Corgi Beach Day 2023");
                event1.setEventType(EventTypeEnum.GATHERING);
                event1.setImage("https://pawfect.s3.ap-southeast-1.amazonaws.com/animalListings/member17%40gmail.com_2023-04-05T05%3A03%3A36.680Z_CorgiBeachDay.png");
                event1.setLocation("Sentosa Beach");
                event1.setMember(memAbc);
                eventListingSessionBean.createEventListing(event1);
                
                
                EventListing event2 = new EventListing();
                event2.setCapacity(40.0);
                event2.setCreateDate(createDate);
                event2.setDateAndTime(sdfDateOnly.parse("2023-05-13"));
                event2.setDescription("Join our Water Play in 2023 for fun in the water with your furry friends!");
                event2.setEventName("Water Play 2023!");
                event2.setEventType(EventTypeEnum.COMPETITION);
                event2.setImage("https://pawfect.s3.ap-southeast-1.amazonaws.com/animalListings/demo1%40gmail.com_2023-04-06T05%3A27%3A31.101Z_WaterPlay.jpg");
                event2.setLocation("YCK Swimming Complex");
                event2.setMember(memJane);
                eventListingSessionBean.createEventListing(event2);
                
                
                
            } catch (ParseException | MemberNotFoundException | ListingExistException ex) {
                Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
            }
        } catch (UnknownPersistenceException ex) {
            ex.printStackTrace();
        } catch (InputDataValidationException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
