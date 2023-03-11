import { Box } from "@mui/system";
import Header from "../../components/Header";
import Userfront from "@userfront/core";

const Dashboard = () => {
  // Userfront.init("5nx5q8vb");
  Userfront.redirectIfLoggedOut({redirect: "/login"});
  // If the user is logged in, show the dashboard
  const userData = JSON.stringify(Userfront.user, null, 2);
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
