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
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

/**
 *
 * @author yijie
 */
@Entity
public class Animal implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long animalId;
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
    private String description;
    @Column(nullable = false)
    @NotNull
    private AnimalTypeEnum animalType;
    @Column(nullable = false)
    @NotNull
    private Boolean isNeutered;
    
    @OneToOne
    @JoinColumn(nullable = true)
    private AnimalListing animalListing;

    public Animal() {
    }
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (getAnimalId() != null ? getAnimalId().hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the animalId fields are not set
        if (!(object instanceof Animal)) {
            return false;
        }
        Animal other = (Animal) object;
        if ((this.getAnimalId() == null && other.getAnimalId() != null) || (this.getAnimalId() != null && !this.animalId.equals(other.animalId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Animal[ id=" + getAnimalId() + " ]";
    }

    public Long getAnimalId() {
        return animalId;
    }

    public void setAnimalId(Long animalId) {
        this.animalId = animalId;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public AnimalListing getAnimalListing() {
        return animalListing;
    }

    public void setAnimalListing(AnimalListing animalListing) {
        this.animalListing = animalListing;
    }
    
    
}
