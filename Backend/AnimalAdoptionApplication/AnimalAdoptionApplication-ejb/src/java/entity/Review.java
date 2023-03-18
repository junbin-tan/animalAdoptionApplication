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
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 *
 * @author yijie
 */
@Entity
public class Review implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    @Column(length = 64, nullable = false)
    @NotNull
    private String title;
    @Column(nullable = false)
    @NotNull
    private String description;
    private Boolean isRemoved;
    @Column(nullable = false)
    @NotNull
    private Integer rating;
    @Column(nullable = false)
	@Temporal(TemporalType.DATE)
    @NotNull
    private Date date;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    @NotNull
    private Member reviewedByMember;
    @ManyToOne
    @JoinColumn(nullable = false)
    @NotNull
    private Member belongedToMember;

    public Review() {
        this.isRemoved = false;
    }
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (getReviewId() != null ? getReviewId().hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the reviewId fields are not set
        if (!(object instanceof Review)) {
            return false;
        }
        Review other = (Review) object;
        if ((this.getReviewId() == null && other.getReviewId() != null) || (this.getReviewId() != null && !this.reviewId.equals(other.reviewId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Review[ id=" + getReviewId() + " ]";
    }

    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getIsRemoved() {
        return isRemoved;
    }

    public void setIsRemoved(Boolean isRemoved) {
        this.isRemoved = isRemoved;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Member getReviewedByMember() {
        return reviewedByMember;
    }

    public void setReviewedByMember(Member reviewedByMember) {
        this.reviewedByMember = reviewedByMember;
    }

    public Member getBelongedToMember() {
        return belongedToMember;
    }

    public void setBelongedToMember(Member belongedToMember) {
        this.belongedToMember = belongedToMember;
    }

    
}