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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 *
 * @author yijie
 */
@Entity
public class Enquiry implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long enquiryId;
	
    @Column(nullable = false)
    @NotNull
    private String name;
	
    @Column(nullable = false)
    @NotNull
    private String email;
	
    @Column(nullable = false)
    @NotNull
    private String message;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createDate;

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (enquiryId != null ? enquiryId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the enquiryId fields are not set
        if (!(object instanceof Enquiry)) {
            return false;
        }
        Enquiry other = (Enquiry) object;
        if ((this.enquiryId == null && other.enquiryId != null) || (this.enquiryId != null && !this.enquiryId.equals(other.enquiryId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Enquiry[ id=" + enquiryId + " ]";
    }
    
    public Long getEnquiryId() {
        return enquiryId;
    }

    public void setEnquiryId(Long enquiryId) {
        this.enquiryId = enquiryId;
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
    
    

    
}
