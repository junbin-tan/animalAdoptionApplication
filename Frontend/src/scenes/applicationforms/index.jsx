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

// importing data should change later
import { mockDataInvoices } from "../../assets/data/mockData";
import Auth from "../../helpers/Auth";
import Api from "../../helpers/Api";

const ApplicationForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // to prevent other userfront non admin logged in in admin
  if (!Auth.isAdmin(Auth.getUser())) {
    Auth.redirectIfLoggedIn("/login");
  }
  // redirect admin to login page if he/she is not logged in
  Auth.redirectIfLoggedOut("/login");

  const [appForms, setAppForm] = useState([]);

  // get allanimallisting from java restful backend
  useEffect(() => {
    Api.getAllApplicationFormAdmin()
      .then((data) => data.json())
      .then((data) => setAppForm(data));
  }, []);

  // map members data to compatible data format for datagrid below
  var tempActualAppForms = [];
  appForms &&
  appForms.map((data) => {
      const appForm = {
        id: data.applicationFormId,
        isFirstTime: data.isFirstTime,
        hasOtherPets: data.hasOtherPets,
        existingPetsOwned: data.existingPetsOwned,
        hasDailyExercise: data.hasDailyExercise,
        sleepArea: data.sleepArea,
        petAloneTime: data.petAloneTime,
        reason: data.reason,
        applicationStatus: data.applicationStatus,
        memberId: data.memberId,
        memberName: data.memberName,
        animalListingId: data.animalListingId,
        animalListingName: data.animalListingName,
        formType: data.formType,

      };
      tempActualAppForms.push(appForm);
    });


  // make the column for the data
  //flex will grow to 1 fractiion of the size of flex , no flex wont grow
  // render cell will allow customeisaton of cell
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "memberName",
      headerName: "Member Name",
      flex: 1,
      cellClassName: "name-column-cell",
    },
    {
        field: "animalListingName",
        headerName: "Animal Listing Name",
        flex: 1,
        cellClassName: "animalListingName-column-cell",
      },
    // { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "formType", headerName: "Form Types", flex: 1 },
    { field: "applicationStatus", headerName: "Application Status", flex: 1 },
    
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
      <Header title="Application Forms" subtitle="List of application forms" />
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
        <DataGrid checkboxSelection rows={tempActualAppForms} columns={columns} />
        {selectedRow && (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent  style={{ border: '1px solid #ccc',
         borderRadius: '10px',
         padding: '20px',
         width: '500px',}}>
            <div>
        
              <h2>More Info</h2>

              <p>ID: {selectedRow.id}</p>
              <p>Member ID: {selectedRow.memberId}</p>
              <p>Member Name: {selectedRow.memberName}</p>
              <p>Animal Listing ID: {selectedRow.animalListingId}</p>
              <p>Animal Listing Name: {selectedRow.animalListingName}</p>
              <p>Application Status: {selectedRow.applicationStatus}</p>
              <p>Form Type: {selectedRow.formType}</p>
              <p>First Time Owner: {selectedRow.isFirstTime ? "Yes" : "No"}</p>
              <p>Has Other Pets: {selectedRow.hasOtherPets  ? "Yes" : "No"}</p>
              <p>Own Exisitngs Pets: {selectedRow.existingPetsOwned}</p>
              <p>Daily Exercise: {selectedRow.hasDailyExercise}</p>
              <p>Sleep Area: {selectedRow.sleepArea}</p>
              <p>Pet Alone Time: {selectedRow.petAloneTime}</p>
              <p  style={{ wordWrap: 'break-word' }}>Reason: {selectedRow.reason}</p> 
            </div>
          </DialogContent>
        </Dialog>
      )}
      </Box>
    </Box>
  );
};

export default ApplicationForm;
