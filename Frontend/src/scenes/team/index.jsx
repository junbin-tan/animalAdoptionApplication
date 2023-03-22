import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/AdminHeader";

// importing data should change later
import { mockDataTeam } from "../../assets/data/mockData";
import Auth from "../../helpers/Auth";

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  // redirect admin to login page if he/she is not logged in
  Auth.redirectIfLoggedOut('/login');

    // make the column for the data
    //flex will grow to 1 fractiion of the size of flex , no flex wont grow
    // render cell will allow customeisaton of cell
    const columns = [
        { field: "id", headerName: "ID"},
        { field: "name", headerName: "Name", flex:1, cellClassName:"name-column-cell"},
        { field: "age", headerName: "Age", type: "number", headerAlign: "left", align:"left"},
        { field: "phone", headerName: "Phone Number", flex:1},
        { field: "email", headerName: "Email", flex:1},
        { field: "access", headerName: "Access Level", flex:1, renderCell: ({row: {access}}) =>{
            return (
                <Box width = "60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor = {
                    access === "admin"
                    ? colors.greenAccent[600]
                    : colors.greenAccent[700]
                }
                borderRadius="4px"
                >
                    {access === "admin" && <AdminPanelSettingsOutlinedIcon/>}
                    {access === "manager" && <SecurityOutlinedIcon/>}
                    {access === "user" && <LockOpenOutlinedIcon/>}
                    <Typography color = {colors.grey[100]} sx={{ml:"5px"}}>
                        {access}
                    </Typography>
                </Box>
            )
        }
    },
    ];

    return (
        // neeed to specify the actual pixel height defintion if not css cannto redner
        // vh is view port height allow data grid to show
        <Box m="20px">
            <Header title = "TEAM" subtitle ="Managing the Team Members" />
            <Box
                m="40ox 0 0 0" height="75vh" sx={{
                    "& .MuiDataGrid-root" : {border:"none"},
                    // if you want to uncomment then the line will disappear
                    // "& .MuiDataGrid-cell" : {borderBottom:"none"},
                    "& .name-column-cell" : {color: colors.greenAccent[300]},
                    "& .MuiDataGrid-columnHeaders" : {backgroundColor: colors.blueAccent[700], borderBottom: "none"},
                    "& .MuiDataGrid-viirtualScroller" : {backgroundColor: colors.primary[400]},
                    "& .MuiDataGrid-footerContainer" : {borderTop:"none",backgroundColor: colors.blueAccent[700]},
                }}>
                <DataGrid
                    rows = {mockDataTeam}
                    columns = {columns}
                />
            </Box>
        </Box>
    )
}

export default Team;