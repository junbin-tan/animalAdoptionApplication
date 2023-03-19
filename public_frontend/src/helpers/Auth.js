import Userfront from "@userfront/core";
import Api from "./Api";
// Initialize Userfront Core JS
Userfront.init("5nx5q8vb");
const Auth = {
  // returns user object if authenticated
  getUser() {
    // this is not our actual user from java backend, only use it to get data like user's email
    if (Userfront.tokens.accessToken) {
      return Userfront.user;
    }
    return null;
  },
  // call this if u want get actual user's data like events, donations, testimonials, etc from our Java Backend Server
  getActualUser() {
    if (this.getUser()) {
       return Api.getMember();
    }
  },
  logout() {
    Userfront.logout();
  },
  // redirect user to login page if he is logged out
  redirectIfLoggedOut() {
    Userfront.redirectIfLoggedOut({ redirect: "/login" });
  },
  // redirect user to specified path if he is logged in
  redirectIfLoggedIn(path) {
    Userfront.redirectIfLoggedIn({ redirect: path });
  },
  getAccessToken() {
    return Userfront.tokens.accessToken;
  },
};

export default Auth;
