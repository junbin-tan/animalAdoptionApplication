import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/AdminHeader";
// import { useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import moment from 'moment-timezone';

// importing data should change later
import { mockDataInvoices } from "../../assets/data/mockData";
import Auth from "../../helpers/Auth";
import Api from "../../helpers/Api";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // to prevent other userfront non admin logged in in admin
  if (!Auth.isAdmin(Auth.getUser())) {
    Auth.redirectIfLoggedIn("/login");
  }
  // redirect admin to login page if he/she is not logged in
  Auth.redirectIfLoggedOut("/login");

  const [enquiries, setEnquiries] = useState([]);

  // get allanimallisting from java restful backend
  useEffect(() => {
    Api.getAllEnquirys()
      .then((data) => data.json())
      .then((data) => setEnquiries(data));
  }, []);

  // map members data to compatible data format for datagrid below
  var tempActualEnquiries = [];
  enquiries &&
  enquiries.map((data) => {
      const enquiry = {
        id: data.enquiryId,
        name: data.name,
        email: data.email,
        message: data.message,
        date: moment(data.createDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ').tz('Asia/Shanghai').format('MMMM Do YYYY'),
      };
      tempActualEnquiries.push(enquiry);
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
    // { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    
    // {
    //   field: "cost",
    //   headerName: "Cost",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Typography color={colors.greenAccent[500]}>
    //       ${params.row.cost}
    //     </Typography>
    //   ),
    // },
    { field: "date", headerName: "Date", flex: 1 },
    // { field: "message", headerName: "Message", flex: 1 },
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
      <Header title="Enquiries" subtitle="List of enquiries" />
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={tempActualEnquiries} columns={columns} />
        {selectedRow && (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent  style={{ border: '1px solid #ccc',
         borderRadius: '10px',
         padding: '20px',
         width: '500px',}}>
            <div>
        
              <h2>More Info</h2>

              <p>ID: {selectedRow.id}</p>
              <p>Name: {selectedRow.name}</p>
              <p>Email: {selectedRow.email}</p>
              <p>Date: {selectedRow.date}</p>
              <p  style={{ wordWrap: 'break-word' }}>Message: {selectedRow.message}</p> 
            </div>
          </DialogContent>
        </Dialog>
      )}
      </Box>
    </Box>
  );
};

export default Invoices;
