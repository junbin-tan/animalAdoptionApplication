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
import Grid from '@mui/material/Grid';

// importing data should change later
import { mockDataTeam } from "../../assets/data/mockData";
import Auth from "../../helpers/Auth";
import Api from "../../helpers/Api";

const AnimalListing = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // to prevent other userfront non admin logged in in admin
  if (!Auth.isAdmin(Auth.getUser())) {
    Auth.redirectIfLoggedIn('/login');
  }
  // redirect admin to login page if he/she is not logged in
  Auth.redirectIfLoggedOut("/login");

  const [animalListings, setAnimalListings] = useState([]);

  // get allanimallisting from java restful backend
    useEffect(() => {
    Api.getAllAnimalListings()
      .then((data) => data.json())
      .then((data) => setAnimalListings(data));
    }, []);

  // map members data to compatible data format for datagrid below
  var tempActualAnimalListings= [];
  animalListings &&
    animalListings.map((data) => {
      const animalListing = {
        id: data.animalListingId,
        flatFee: data.flatFee,
        description: data.description,
        age: data.age,
        name: data.name,
        gender: data.gender,
        breed: data.breed,
        weight: data.weight,
        animalType: data.animalType,
        isActive: data.isActive,
        isNeutered: data.isNeutered,
        isAdoption: data.isAdoption,
        isFostering: data.isFostering,
        fosterStartDate: data.fosterStartDate,
        fosterEndDate: data.fosterEndDate,
      };
      tempActualAnimalListings.push(animalListing);
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
    { field: "age", headerName: "Age", type: "number", headerAlign: "left", align:"left"},
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "breed", headerName: "Breed", flex: 1 },
    { field: "animalType", headerName: "Animal Type", flex: 1 },
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
      <Header title="Animal Listings" subtitle="Current Animal Listings" />
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
        <DataGrid rows={tempActualAnimalListings} columns={columns} />
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
              <p>Age: {selectedRow.age}</p>
              <p>Gender: {selectedRow.gender}</p>
              <p>Breed: {selectedRow.breed}</p>
              <p>Weight: {selectedRow.weight}</p>
              <p>Animal Type: {selectedRow.animalType}</p>
              <p>Active: {selectedRow.isActive ? "Yes" : "No"}</p>
              <p>Neutered: {selectedRow.isNeutered ? "Yes" : "No"}</p>
              <p>Adoption: {selectedRow.isAdoption ? "Yes" : "No"}</p>
              <p>Fostering: {selectedRow.isFostering ? "Yes" : "No"}</p>
              {selectedRow.isFostering ? (
                <>
               <p>Foster Start Date: {selectedRow.fosterStartDate}</p>
               <p>Foster End Date: {selectedRow.fosterEndDate}</p>
               </>) : null}
              <p>Description: {selectedRow.description}</p>

      
            </div>
          </DialogContent>
        </Dialog>
      )}
      </Box>
    </Box>
  );
};

export default AnimalListing;
