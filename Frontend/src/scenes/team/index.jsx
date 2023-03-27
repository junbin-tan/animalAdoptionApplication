import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/AdminHeader";
import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


// importing data should change later
import { mockDataTeam } from "../../assets/data/mockData";
import Auth from "../../helpers/Auth";
import Api from "../../helpers/Api";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // to prevent other userfront non admin logged in in admin
  if (!Auth.isAdmin(Auth.getUser())) {
    Auth.redirectIfLoggedIn('/login');
  }
  // redirect admin to login page if he/she is not logged in
  Auth.redirectIfLoggedOut("/login");

  const [members, setMembers] = useState([]);

  // get members from java restful backend
  useEffect(() => {
    Api.getAllMembers()
      .then((data) => data.json())
      .then((data) => setMembers(data));
  }, []);

  // map members data to compatible data format for datagrid below
  var tempActualMembers = [];
  members &&
    members.map((data) => {
      const member = {
        id: data.memberId,
        name: data.name,
        phone: data.phoneNumber,
        email: data.email,
        access: "user",
        openToFoster: data.openToFoster,
        openToAdopt: data.openToAdopt,
        location: data.location,
        occupation: data.occupation,
        residentialType: data.residentialType,
        accountStatus: data.accountStatus,
      };
      tempActualMembers.push(member);
    });


  // make the column for the data
  //flex will grow to 1 fractiion of the size of flex , no flex wont grow
  // render cell will allow customeisaton of cell
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column-cell",
    },
    // { field: "age", headerName: "Age", type: "number", headerAlign: "left", align:"left"},
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    { 
      field: 'moreInfo', 
      headerName: 'More Info', 
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button 
          variant="contained" 
          onClick={() => handleClickOpen(params.row)}
        >
          View
        </Button>
      )
    },

  ];
  
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  return (
    // neeed to specify the actual pixel height defintion if not css cannto redner
    // vh is view port height allow data grid to show
    <Box m="20px">
      <Header title="Members" subtitle="Managing the Current Members" />
      <Box
        m="40ox 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          // if you want to uncomment then the line will disappear
          // "& .MuiDataGrid-cell" : {borderBottom:"none"},
          "& .name-column-cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-viirtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid rows={tempActualMembers} columns={columns} />
        {selectedRow && (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent  style={{border: '1px solid white'}}>
            <div>
        
              <h2>More Info</h2>
              <p>ID: {selectedRow.id}</p>
              <p>Name: {selectedRow.name}</p>
              <p>Email: {selectedRow.email}</p>
              <p>Access: {selectedRow.access}</p>
              <p>Location: {selectedRow.location}</p>
              <p>Occupation: {selectedRow.occupation}</p>
              <p>Residential Type: {selectedRow.residentialType}</p>
              <p>Account Status: {selectedRow.accountStatus} </p>
              <p>Open To Foster: {selectedRow.openToFoster ? "Yes" : "No"} </p>
              <p>Open To Adopt: {selectedRow.openToAdopt ? "Yes" : "No"}</p>
      
            </div>
          </DialogContent>
        </Dialog>
      )}
      </Box>
    </Box>
  );
};

export default Team;
