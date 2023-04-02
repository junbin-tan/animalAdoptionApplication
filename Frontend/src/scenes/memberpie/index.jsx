import { Box } from "@mui/material";
import Header from "../../components/AdminHeader";
import MemberPie from "../../components/MemberVerifiedPie";
import Auth from "../../helpers/Auth";

const MemPie = () => {
  // to prevent other userfront non admin logged in in admin
  if (!Auth.isAdmin(Auth.getUser())) {
    Auth.redirectIfLoggedIn('/login');
  }
  // redirect admin to login page if he/she is not logged in
  Auth.redirectIfLoggedOut("/login");

  return (
    <Box m="20px">
      <Header title="Member Status Breakdown " subtitle="Member Accounts By Status" />
      <Box height="75vh">
        <MemberPie />
      </Box>
    </Box>
  );
};

export default MemPie;
