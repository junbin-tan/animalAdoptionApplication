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
public class EventField implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventFieldId;
    @Column(length = 64, nullable = false)
    @NotNull
    private String fieldName;
    @Column(nullable = false)
    @NotNull
    private String fieldValue;
    
    @ManyToOne
    @JoinColumn(nullable = false)
    @NotNull
    private EventListing eventListing;

    public EventField() {
    }
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (eventFieldId != null ? eventFieldId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the eventFieldId fields are not set
        if (!(object instanceof EventField)) {
            return false;
        }
        EventField other = (EventField) object;
        if ((this.eventFieldId == null && other.eventFieldId != null) || (this.eventFieldId != null && !this.eventFieldId.equals(other.eventFieldId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.EventField[ id=" + eventFieldId + " ]";
    }
    
    public Long getEventFieldId() {
        return eventFieldId;
    }

    public void setEventFieldId(Long eventFieldId) {
        this.eventFieldId = eventFieldId;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getFieldValue() {
        return fieldValue;
    }

    public void setFieldValue(String fieldValue) {
        this.fieldValue = fieldValue;
    }
}
