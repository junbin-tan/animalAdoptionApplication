import { Box } from "@mui/material";
import Header from "../../components/AdminHeader";
import PieChart from "../../components/PieChart";
import Auth from "../../helpers/Auth";

const Pie = () => {
  // redirect admin to login page if he/she is not logged in
  Auth.redirectIfLoggedOut("/login");

  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
