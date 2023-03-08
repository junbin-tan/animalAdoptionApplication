/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

/**
 *
 * @author yijie
 */
@Entity
public class Member implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    @Column(length = 64, nullable = false)
    @NotNull
    private String name;
    @Column(length = 64, nullable = false, unique = true)
    @NotNull
    private String email;
    @Column(length = 10, nullable = false)
    @NotNull
    private String password;
    @Column(length = 10, nullable = false)
    @NotNull
    private String phoneNumber;
    @Column(nullable = false)
    @NotNull
    private Boolean openToFoster;
    @Column(nullable = false)
    @NotNull
    private Boolean openToAdopt;
    @Column(length = 64, nullable = false)
    @NotNull
    private String location;
    @Column(length = 64, nullable = false)
    @NotNull
    private String occupation;
    @Column(nullable = false)
    @NotNull
    private ResidentialTypeEnum residentialType;
    @Column(nullable = false)
    @NotNull
    private AccountStatusEnum accountStatus;
    
    @OneToMany(mappedBy = "reviewedByMember")
    private List<Review> reviewsCreated;
    @OneToMany(mappedBy = "belongedToMember")
    private List<Review> reviewsReceived;
    @OneToMany(mappedBy = "member")
    private List<EventListing> eventListings;
    @OneToMany(mappedBy = "member")
    private List<EventRegistration> eventRegistrations;
    @OneToMany(mappedBy = "member")
    private List<AnimalListing> animalListings;
    @OneToMany(mappedBy = "member")
    private List<ApplicationForm> applicationForms;
    @OneToMany(mappedBy = "member")
    private List<Donation> donations;
    @OneToMany(mappedBy = "member")
    private List<Notification> notifications;

    public Member() {
        this.reviewsCreated = new ArrayList<Review>();
        this.reviewsReceived = new ArrayList<Review>();
        this.eventListings = new ArrayList<EventListing>();
        this.eventRegistrations = new ArrayList<EventRegistration>();
        this.animalListings = new ArrayList<AnimalListing>();
        this.applicationForms = new ArrayList<ApplicationForm>();
        this.donations = new ArrayList<Donation>();
        this.notifications = new ArrayList<Notification>();
        this.accountStatus = AccountStatusEnum.UNVERIFIED;
    }
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (memberId != null ? memberId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the memberId fields are not set
        if (!(object instanceof Member)) {
            return false;
        }
        Member other = (Member) object;
        if ((this.memberId == null && other.memberId != null) || (this.memberId != null && !this.memberId.equals(other.memberId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Member[ id=" + memberId + " ]";
    }
    
    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Boolean getOpenToFoster() {
        return openToFoster;
    }

    public void setOpenToFoster(Boolean openToFoster) {
        this.openToFoster = openToFoster;
    }

    public Boolean getOpenToAdopt() {
        return openToAdopt;
    }

    public void setOpenToAdopt(Boolean openToAdopt) {
        this.openToAdopt = openToAdopt;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public ResidentialTypeEnum getResidentialType() {
        return residentialType;
    }

    public void setResidentialType(ResidentialTypeEnum residentialType) {
        this.residentialType = residentialType;
    }

    public AccountStatusEnum getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(AccountStatusEnum accountStatus) {
        this.accountStatus = accountStatus;
    }

    public List<Review> getReviewsCreated() {
        return reviewsCreated;
    }

    public void setReviewsCreated(List<Review> reviewsCreated) {
        this.reviewsCreated = reviewsCreated;
    }

    public List<Review> getReviewsReceived() {
        return reviewsReceived;
    }

    public void setReviewsReceived(List<Review> reviewsReceived) {
        this.reviewsReceived = reviewsReceived;
    }

    public List<EventListing> getEventListings() {
        return eventListings;
    }

    public void setEventListings(List<EventListing> eventListings) {
        this.eventListings = eventListings;
    }

    public List<EventRegistration> getEventRegistrations() {
        return eventRegistrations;
    }

    public void setEventRegistrations(List<EventRegistration> eventRegistrations) {
        this.eventRegistrations = eventRegistrations;
    }

    public List<AnimalListing> getAnimalListings() {
        return animalListings;
    }

    public void setAnimalListings(List<AnimalListing> animalListings) {
        this.animalListings = animalListings;
    }

    public List<ApplicationForm> getApplicationForms() {
        return applicationForms;
    }

    public void setApplicationForms(List<ApplicationForm> applicationForms) {
        this.applicationForms = applicationForms;
    }

	public List<Donation> getDonations() {
        return donations;
    }

    public void setDonations(List<Donation> donations) {
        this.donations = donations;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }
    
}
