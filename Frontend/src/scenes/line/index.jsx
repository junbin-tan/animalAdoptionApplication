import { Box } from "@mui/material";
import Header from "../../components/AdminHeader";
import LineChart from "../../components/LineChart";
import Auth from "../../helpers/Auth";

const Line = () => {
  
  // to prevent other userfront non admin logged in in admin
  if (!Auth.isAdmin(Auth.getUser())) {
    Auth.redirectIfLoggedIn('/login');
  }

  // redirect admin to login page if he/she is not logged in
  Auth.redirectIfLoggedOut("/login");

  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
