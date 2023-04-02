/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
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
    private String description;
    @Column(nullable = false)
    @NotNull
    private String image;
    @Column(nullable = false)
    @NotNull
    private Integer age;
    @Column(length = 64, nullable = false)
    @NotNull
    private String name;
    @Column(nullable = false)
    @NotNull
    private GenderEnum gender;
    @Column(length = 128, nullable = false)
    @NotNull
    private String breed;
    @Column(nullable = false)
    @NotNull
    private Double weight;
    @Column(nullable = false)
    @NotNull
    private AnimalTypeEnum animalType;
    @Column(nullable = false)
    @NotNull
    private Boolean isNeutered;
    @Column(nullable = false)
    @NotNull
    private Boolean isAdoption;
	
    @Column(nullable = false)
    @NotNull
    private Boolean isFostering;
    @Temporal(TemporalType.DATE)
    private Date fosterStartDate;
    @Temporal(TemporalType.DATE)
    private Date fosterEndDate;
	
    private Boolean isActive;
    
    private Date createDate;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    @NotNull
    private Member member;

    @OneToMany(mappedBy = "animalListing")
    private List<ApplicationForm> applicationForms;

    public AnimalListing() {
        this.flatFee = 100.00;
        this.isActive = true;
        this.applicationForms = new ArrayList<ApplicationForm>();
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public AnimalTypeEnum getAnimalType() {
        return animalType;
    }

    public void setAnimalType(AnimalTypeEnum animalType) {
        this.animalType = animalType;
    }

    public Boolean getIsNeutered() {
        return isNeutered;
    }

    public void setIsNeutered(Boolean isNeutered) {
        this.isNeutered = isNeutered;
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

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    
    
}
