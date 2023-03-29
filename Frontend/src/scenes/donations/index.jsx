import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/AdminHeader";
import React, { useState, useEffect } from "react";
import moment from 'moment-timezone';



// importing data should change later

import Auth from "../../helpers/Auth";
import Api from "../../helpers/Api";

const Donations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // to prevent other userfront non admin logged in in admin
  if (!Auth.isAdmin(Auth.getUser())) {
    Auth.redirectIfLoggedIn('/login');
  }
  // redirect admin to login page if he/she is not logged in
  Auth.redirectIfLoggedOut("/login");

  const [donations, setDonations] = useState([]);


    useEffect(() => {
    Api.getAllTestimonialdmin()
      .then((data) => data.json())
      .then((data) => setDonations(data));
    }, []);

  // map members data to compatible data format for datagrid below
  var tempActualDonations= [];
  donations &&
    donations.map((data) => {
      const donation = {
        id: data.donationId,
        name: data.name,
        email: data.email,
        date: moment(data.date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').tz('Asia/Shanghai').format('MMMM Do YYYY'),
        paymentMode: data.paymentMode,
        donationType: data.donationType,      
      };
      tempActualDonations.push(donation);
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
    { field: "email", headerName: "Email", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "paymentMode", headerName: "Payment Mode", flex: 1 },
    { field: "donationType", headerName: "Donation Type", flex: 1 },

  ];
  
 

  return (
    // neeed to specify the actual pixel height defintion if not css cannto redner
    // vh is view port height allow data grid to show
    <Box m="20px">
      <Header title="Donations" subtitle="View all Donations" />
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
        <DataGrid rows={tempActualDonations} columns={columns} />
       
      </Box>
    </Box>
  );
};

export default Donations;
