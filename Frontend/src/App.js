//import "./app.css";
import Layout from "./components/Layout/Layout";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";

// importing scene/pages to set up routers
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import AnimalListing from "./scenes/animallisting";
import TeamAdmin from "./scenes/teamadmin";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Donations from "./scenes/donations";
import ApplicationForm from "./scenes/applicationforms";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar";
import LoginPage from "./pages/login/loginPage";

//theme
import "primereact/resources/themes/lara-light-blue/theme.css";   
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";  

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{display: 'flex'}}> 
          <Sidebar  style={{height: "100vh"}}/>
            <main className="content" style={{flex: '1 auto'}}>
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/teamadmin" element={<TeamAdmin />} />
                <Route path="/animallisting" element={<AnimalListing />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/applicationforms" element={<ApplicationForm />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/donations" element={<Donations />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </main>

        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
