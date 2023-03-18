import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import Auth from "../../helpers/Auth";

// icon import
import RegisterIcon from '@mui/icons-material/Publish';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PetsIcon from "@mui/icons-material/Pets";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from "@mui/icons-material/Event";
import CallIcon from "@mui/icons-material/Call";
import InfoIcon from "@mui/icons-material/Info";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ colors: colors.grey[100] }}
      onClick={() => {
        setSelected(title);
        if (title === "Logout") {
          Auth.logout();
        }
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // to check if the side bar is collaapsed or not
  const [isCollapsed, setIsCollapsed] = useState(false);
  // check what page you are currently at
  const [selected, setSelected] = useState("Dashboard");

  // get currrent user if authenticated
  const currentUser = Auth.getUser();

  //!important will overidee the background
  if (currentUser) {
    return (
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#6870fa !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed} style={{ height: "100vh" }}>
          <Menu iconShape="square">
            {/* Create logo and menu icons here */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h4" color={colors.grey[100]}>
                    Pawfect
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
            {/* Create user  icon + name*/}
            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  {/* put user image tag here */}
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={currentUser.image}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Welcome!
                  </Typography>
                  <Typography variant="h5" color={colors.grey[100]}>
                    {currentUser.email}
                  </Typography>
                </Box>
              </Box>
            )}
            {/* creating menu items */}
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Manage Account"
                to="/"
                icon={<AccountCircleIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Animal Registration"
                to="/AnimalRegistration"
                icon={<RegisterIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                {" "}
                Our Services
              </Typography>
              <Item
                title="Home"
                to="/Homepage"
                icon={<HomeIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="About Us"
                to="/AboutUs"
                icon={<InfoIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Adoption & Fostering"
                to="/AdoptionFostering"
                icon={<PetsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Donation"
                to="/Donation"
                icon={<VolunteerActivismIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="View Testimonials"
                to="/Testimonial"
                icon={<CallIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Events & Marketing"
                to="/EventsAndMarketing"
                icon={<EventIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Contact Us"
                to="/Contact"
                icon={<CallIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="FAQ"
                to="/faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Logout"
                to="/"
                icon={<LogoutIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    );
  }

  return (
    <>
    <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#6870fa !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed} style={{ height: "100vh" }}>
          <Menu iconShape="square">
            {/* Create logo and menu icons here */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h4" color={colors.grey[100]}>
                    Pawfect
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
            {/* Create user  icon + name*/}
            {!isCollapsed && (
              <Box mb="25px">
                
                
              </Box>
            )}
            {/* creating menu items */}
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                {" "}
                Our Services
              </Typography>
              <Item
                title="About Us"
                to="/AboutUs"
                icon={<InfoIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Adoption & Fostering"
                to="/AdoptionFostering"
                icon={<PetsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Donation"
                to="/Donation"
                icon={<VolunteerActivismIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Events & Marketing"
                to="/EventsAndMarketing"
                icon={<EventIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Contact Us"
                to="/Contact"
                icon={<CallIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="FAQ"
                to="/faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Login"
                to="/login"
                icon={<LoginIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </>
  )
};

export default Sidebar;
