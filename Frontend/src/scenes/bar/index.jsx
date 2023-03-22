import { Box } from "@mui/material";
import Header from "../../components/AdminHeader";
import BarChart from "../../components/BarChart";
import Auth from "../../helpers/Auth";

const Bar = () => {
  // redirect admin to login page if he/she is not logged in
  Auth.redirectIfLoggedOut("/login");


  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
