import { Box } from "@mui/system";
import Header from "../../components/AdminHeader";

const Dashboard = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to Dashboard" />
      </Box>
    </Box>
  );
};

export default Dashboard;
