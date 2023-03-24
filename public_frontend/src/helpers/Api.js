//This module provides a list of helper methods for accessing the

import Auth from "./Auth";

// Pawfect RESTful API
const SERVER_PREFIX =
  "http://localhost:8080/AnimalAdoptionApplication-war/webresources";

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
  createAnimalListing(data) {
    return fetch(`${SERVER_PREFIX}/animalListing/createAnimalListing`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  createEventListing(data) {
    return fetch(`${SERVER_PREFIX}/eventListing/createEventListing`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getMember() {
    // get Actual member json object with all data like donations, testimonials, events, etc
    return fetch(`${SERVER_PREFIX}/member/getMember/${Auth.getUser().email}`, {
      headers: {
        Authorization: `Bearer ${Auth.getAccessToken()}`,
      },
      method: "GET",
    });
  },
  getAllTestimonials() {
    return fetch(`${SERVER_PREFIX}/testimonial`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },
  getAllAnimalListings() {
    return fetch(`${SERVER_PREFIX}/animalListing`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  getAllEventListings() {
    return fetch(`${SERVER_PREFIX}/eventListing`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  createApplicationForm(data) {
    return fetch(`${SERVER_PREFIX}/applicationForm/createApplicationForm`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getAnimalListingByMemberEmail() {
    return fetch(
      `${SERVER_PREFIX}/animalListing/getAnimalListingByMemberEmail/${
        Auth.getUser().email
      }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
  },
  deleteAnimalListingByAnimalListingId(animalListingId) {
    return fetch(
      `${SERVER_PREFIX}/animalListing/deleteAnimalListing/${animalListingId}`,
      {
        method: "DELETE",
      }
    );
  },

  getApplicationFormByMemberEmail() {
    return fetch(
      `${SERVER_PREFIX}/applicationForm/getApplicationFormByMemberEmail/${
        Auth.getUser().email
      }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
  },
  deleteApplicationFormByApplicationFormId(applicationFormId) {
    return fetch(
      `${SERVER_PREFIX}/applicationForm/deleteApplicationForm/${applicationFormId}`,
      {
        method: "DELETE",
      }
    );
  },
  updateAppFormStatus(applicationFormId, data) {
    return fetch(
      `${SERVER_PREFIX}/applicationForm/updateApplicationFormStatus/${applicationFormId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  },
};

export default Api;
