import Auth from "./Auth";

// Pawfect RESTful API
const SERVER_PREFIX = "http://localhost:8080/AnimalAdoptionApplication-war/webresources";

const Api = {
    getAllMembers() {
        return fetch(`${SERVER_PREFIX}/member/getAllMembers`, {
         headers: {
             "Authorization": `Bearer ${Auth.getAccessToken()}`,
         },
         method: "GET",
      });
    },
    getAllAdmins() {
        return fetch(`${SERVER_PREFIX}/admin/getAllAdmins`, {
         headers: {
             "Authorization": `Bearer ${Auth.getAccessToken()}`,
         },
         method: "GET",
      });
    },
    getAllAnimalListings() {
        return fetch(`${SERVER_PREFIX}/animalListing/getAllAnimalListingsAdmin`, {
            headers: {
                "Authorization": `Bearer ${Auth.getAccessToken()}`,
            },
          method: "GET",
        });
    },
}

export default Api;