/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

/**
 *
 * @author yijie
 */
@Entity
public class AnimalListing implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long animalListingId;
    @Column(nullable = false)
    @NotNull
    private Double flatFee;
    @Column(nullable = false)
    @NotNull
    private String reason;
    @Column(nullable = false)
    @NotNull
    private Boolean isAdoption;
    @Column(nullable = false)
    @NotNull
    private Boolean isFostering;
    private Date fosterStartDate;
    private Date fosterEndDate;
    private Boolean isActive;
    
    @OneToOne
    @JoinColumn(nullable = false)
    @NotNull
    private Animal animal;
    @ManyToOne
    @JoinColumn(nullable = false)
    @NotNull
    private Member member;
    @OneToMany(mappedBy = "animalListing")
    private List<ApplicationForm> applicationForms;
    

    public AnimalListing() {
        this.flatFee = 100.00;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (getAnimalListingId() != null ? getAnimalListingId().hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the animalListingId fields are not set
        if (!(object instanceof AnimalListing)) {
            return false;
        }
        AnimalListing other = (AnimalListing) object;
        if ((this.getAnimalListingId() == null && other.getAnimalListingId() != null) || (this.getAnimalListingId() != null && !this.animalListingId.equals(other.animalListingId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.AnimalListing[ id=" + getAnimalListingId() + " ]";
    }

    public Long getAnimalListingId() {
        return animalListingId;
    }

    public void setAnimalListingId(Long animalListingId) {
        this.animalListingId = animalListingId;
    }

    public Double getFlatFee() {
        return flatFee;
    }

    public void setFlatFee(Double flatFee) {
        this.flatFee = flatFee;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Boolean getIsAdoption() {
        return isAdoption;
    }

    public void setIsAdoption(Boolean isAdoption) {
        this.isAdoption = isAdoption;
    }

    public Boolean getIsFostering() {
        return isFostering;
    }

    public void setIsFostering(Boolean isFostering) {
        this.isFostering = isFostering;
    }

    public Date getFosterStartDate() {
        return fosterStartDate;
    }

    public void setFosterStartDate(Date fosterStartDate) {
        this.fosterStartDate = fosterStartDate;
    }

    public Date getFosterEndDate() {
        return fosterEndDate;
    }

    public void setFosterEndDate(Date fosterEndDate) {
        this.fosterEndDate = fosterEndDate;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public List<ApplicationForm> getApplicationForms() {
        return applicationForms;
    }

    public void setApplicationForms(List<ApplicationForm> applicationForms) {
        this.applicationForms = applicationForms;
    }

    
    
}
