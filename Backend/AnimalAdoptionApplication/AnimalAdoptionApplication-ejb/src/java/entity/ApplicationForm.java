/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

/**
 *
 * @author yijie
 */
@Entity
public class ApplicationForm implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationFormId;
	
    @Column(nullable = false)
    @NotNull
    private Boolean isFirstTime;
	
    @Column(nullable = false)
    @NotNull
    private Boolean hasOtherPets;
	
    private Integer exisitngPetsOwned;
	
    private Boolean hasDailyExercise;
	
    private SleepAreaEnum sleepArea;
	
    private Integer petAloneTime;
	
    @Column(nullable = false)
    @NotNull
    private String reason;
	
    @Column(nullable = false)
    @NotNull
    private ApplicationStatusEnum applicationStatus;
    
    @Column(nullable = false)
    @NotNull
    private FormTypeEnum formType;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    @NotNull
    private Member member;
	 
    @ManyToOne
    @JoinColumn(nullable = false)
    @NotNull
    private AnimalListing animalListing;

    public ApplicationForm() {
        this.applicationStatus = ApplicationStatusEnum.SUBMITTED;
    }
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (getApplicationFormId() != null ? getApplicationFormId().hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the applicationFormId fields are not set
        if (!(object instanceof ApplicationForm)) {
            return false;
        }
        ApplicationForm other = (ApplicationForm) object;
        if ((this.getApplicationFormId() == null && other.getApplicationFormId() != null) || (this.getApplicationFormId() != null && !this.applicationFormId.equals(other.applicationFormId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.ApplicationForm[ id=" + getApplicationFormId() + " ]";
    }

    public Long getApplicationFormId() {
        return applicationFormId;
    }

    public void setApplicationFormId(Long applicationFormId) {
        this.applicationFormId = applicationFormId;
    }

    public Boolean getIsFirstTime() {
        return isFirstTime;
    }

    public void setIsFirstTime(Boolean isFirstTime) {
        this.isFirstTime = isFirstTime;
    }

    public Boolean getHasOtherPets() {
        return hasOtherPets;
    }

    public void setHasOtherPets(Boolean hasOtherPets) {
        this.hasOtherPets = hasOtherPets;
    }

    public Integer getExisitngPetsOwned() {
        return exisitngPetsOwned;
    }

    public void setExisitngPetsOwned(Integer exisitngPetsOwned) {
        this.exisitngPetsOwned = exisitngPetsOwned;
    }

    public Boolean getHasDailyExercise() {
        return hasDailyExercise;
    }

    public void setHasDailyExercise(Boolean hasDailyExercise) {
        this.hasDailyExercise = hasDailyExercise;
    }

    public SleepAreaEnum getSleepArea() {
        return sleepArea;
    }

    public void setSleepArea(SleepAreaEnum sleepArea) {
        this.sleepArea = sleepArea;
    }

    public Integer getPetAloneTime() {
        return petAloneTime;
    }

    public void setPetAloneTime(Integer petAloneTime) {
        this.petAloneTime = petAloneTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public ApplicationStatusEnum getApplicationStatus() {
        return applicationStatus;
    }

    public void setApplicationStatus(ApplicationStatusEnum applicationStatus) {
        this.applicationStatus = applicationStatus;
    }

    public FormTypeEnum getFormType() {
        return formType;
    }

    public void setFormType(FormTypeEnum formType) {
        this.formType = formType;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public AnimalListing getAnimalListing() {
        return animalListing;
    }

    public void setAnimalListing(AnimalListing animalListing) {
        this.animalListing = animalListing;
    }
    
    
    
}
