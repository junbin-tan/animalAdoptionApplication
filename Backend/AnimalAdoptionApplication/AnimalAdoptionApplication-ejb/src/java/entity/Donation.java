/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 *
 * @author yijie
 */
@Entity
public class Donation implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationId;
	
	@Temporal(TemporalType.DATE)	
    private Date date;
	
    @Column(nullable = true)
    private PaymentModeEnum paymentMode;
	
    @Column(nullable = true)
    private Double amount;
	
    @Column(nullable = true)
    private DonationStatusEnum donationStatus;
    
	@ManyToOne(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    @JoinColumn(nullable = true)
    private Member member;
	
    @OneToOne
    @JoinColumn(nullable = true)
    private Testimonial testimonial;

    public Donation() {}
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (getDonationId() != null ? getDonationId().hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the donationId fields are not set
        if (!(object instanceof Donation)) {
            return false;
        }
        Donation other = (Donation) object;
        if ((this.getDonationId() == null && other.getDonationId() != null) || (this.getDonationId() != null && !this.donationId.equals(other.donationId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Donation[ id=" + getDonationId() + " ]";
    }

    public Long getDonationId() {
        return donationId;
    }

    public void setDonationId(Long donationId) {
        this.donationId = donationId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public PaymentModeEnum getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(PaymentModeEnum paymentMode) {
        this.paymentMode = paymentMode;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public DonationStatusEnum getDonationStatus() {
        return donationStatus;
    }

    public void setDonationStatus(DonationStatusEnum donationStatus) {
        this.donationStatus = donationStatus;
    }

	public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public Testimonial getTestimonial() {
        return testimonial;
    }

    public void setTestimonial(Testimonial testimonial) {
        this.testimonial = testimonial;
    }
}
