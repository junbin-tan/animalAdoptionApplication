//This module provides a list of helper methods for accessing the

import Auth from "./Auth";

// Pawfect RESTful API
const SERVER_PREFIX = "http://localhost:8080/AnimalAdoptionApplication-war/webresources";

const Api = {
   createMember(data) {
     return fetch(`${SERVER_PREFIX}/member/createMember`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
     });
   },
   login(data) {
      return fetch(`${SERVER_PREFIX}/member/login`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
     });
   },
   createNewDonation(data) {
      return fetch(`${SERVER_PREFIX}/donation`, {
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
         },
         method: "POST",
         body: JSON.stringify(data),
      });
    },
    createEnquiry(data) {
      return fetch(`${SERVER_PREFIX}/enquiry/createEnquiry`, {
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
         },
         method: "POST",
         body: JSON.stringify(data),
      });
    },
    testAuthorization() { // testing method to ensure only authenticated user can call certain API methods, like we don't want unauthenticated user able to call API methods like createEvent
      return fetch(`${SERVER_PREFIX}/member/testAuth`, {
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
             "Authorization": `Bearer ${Auth.getAccessToken()}`,
         },
         method: "GET",
      });
    },
};

export default Api;