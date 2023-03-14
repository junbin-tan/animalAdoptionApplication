import { Box } from "@mui/system";
import Header from "../../components/Header";
import Auth from "../../helpers/Auth";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../helpers/context/UserContext";

const Dashboard = () => {
  // if the user tries to access dashboard while logged out, redirect them to /login. Do this for every single page that requires user to be logged in
  Auth.redirectIfLoggedOut();
  // If the user is logged in, show the dashboard
  const currentUser = Auth.getUser();
  const userData = currentUser && JSON.stringify(currentUser, null, 2); // get user data


  // START: Code to retrieve latest actual Member Data from Java Backend Restful Server

  const {currentActualUser} = useContext(UserContext);

  console.log(currentActualUser);

  // const [actualUser, setActualUser] = useState();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await Auth.getActualUser();
  //     const data = await response.json();
  //     setActualUser(data);
  //   };

  //   fetchData();
  // }, []);

  // const userDonations = actualUser && actualUser.donations; // <-- Alwin, this is how you retrieve latest donations data for current user
  // console.log(userDonations);

  // END: Code to retrieve latest actual Member Data from Java Backend Restful Server
  

  
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to Dashboard" />
        <div>
          <h2>Dashboard</h2>
          <pre>{userData}</pre>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
