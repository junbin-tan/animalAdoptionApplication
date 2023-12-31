/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import java.util.Set;

/**
 *
 * @author jiawe
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends javax.ws.rs.core.Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(webservices.restful.AdminResource.class);
        resources.add(webservices.restful.AnimalListingResource.class);
        resources.add(webservices.restful.ApplicationFormResource.class);
        resources.add(webservices.restful.CORSFilter.class);
        resources.add(webservices.restful.DonationResource.class);
        resources.add(webservices.restful.EnquiryResource.class);
        resources.add(webservices.restful.EventListingResource.class);
        resources.add(webservices.restful.EventRegistrationResource.class);
        resources.add(webservices.restful.MembersResource.class);
        resources.add(webservices.restful.NotificationResource.class);
        resources.add(webservices.restful.TestimonialResource.class);
        
    }
    
}
