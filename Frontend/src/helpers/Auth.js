import Userfront from "@userfront/core";
// Initialize Userfront Core JS
Userfront.init("pn4545mb");

const Auth = {
  // returns user object if authenticated
  getUser() {
    // this is not our actual user from java backend, only use it to get data like user's email
    if (Userfront.tokens.accessToken) {
      return Userfront.user;
    }
    return null;
  },
  isAdmin(currentUser) {
    return (
      currentUser &&
      currentUser.data &&
      currentUser.data.role &&
      currentUser.data.role === "admin"
    );
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
