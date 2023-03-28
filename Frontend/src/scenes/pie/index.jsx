import { Box } from "@mui/material";
import Header from "../../components/AdminHeader";
import PieChart from "../../components/PieChart";
import Auth from "../../helpers/Auth";

const Pie = () => {
  // to prevent other userfront non admin logged in in admin
  if (!Auth.isAdmin(Auth.getUser())) {
    Auth.redirectIfLoggedIn('/login');
  }
  // redirect admin to login page if he/she is not logged in
  Auth.redirectIfLoggedOut("/login");

  return (
    <Box m="20px">
      <Header title="Event Listing Breakdown" subtitle="Event Listings By Types" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
