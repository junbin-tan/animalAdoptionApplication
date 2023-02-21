/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
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
public class Testimonial implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long testimonialId;
    @Column(nullable = false)
    @NotNull
    private String message;
    @Column(nullable = false)
    @NotNull
    private Date date;
    
    @OneToOne
    @JoinColumn(nullable = false)
    @NotNull
    private Donation donation;

    public Testimonial() {
    }
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (getTestimonialId() != null ? getTestimonialId().hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the testimonialId fields are not set
        if (!(object instanceof Testimonial)) {
            return false;
        }
        Testimonial other = (Testimonial) object;
        if ((this.getTestimonialId() == null && other.getTestimonialId() != null) || (this.getTestimonialId() != null && !this.testimonialId.equals(other.testimonialId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Testimonial[ id=" + getTestimonialId() + " ]";
    }

    public Long getTestimonialId() {
        return testimonialId;
    }

    public void setTestimonialId(Long testimonialId) {
        this.testimonialId = testimonialId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Donation getDonation() {
        return donation;
    }

    public void setDonation(Donation donation) {
        this.donation = donation;
    }
    
    
    
}
