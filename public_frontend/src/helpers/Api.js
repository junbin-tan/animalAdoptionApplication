//This module provides a list of helper methods for accessing the
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
   }
};

export default Api;