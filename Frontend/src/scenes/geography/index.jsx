import { Box } from "@mui/material";
import Header from "../../components/AdminHeader";
import GeographyChart from "../../components/GeographyChart";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Auth from "../../helpers/Auth";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // redirect admin to login page if he/she is not logged in
  Auth.redirectIfLoggedOut("/login");

  return (
    <Box m="20px">
      <Header title="Geography Chart" subtitle="Simple Geography Chart" />
      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geography;
