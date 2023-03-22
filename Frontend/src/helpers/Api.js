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
}

export default Api;