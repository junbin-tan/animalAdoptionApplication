import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
//theme
import "primereact/resources/themes/lara-light-blue/theme.css";   
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";  
// importing scene/pages to set up routers
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import RegisterPage from "./pages/register/registerPage";
import LoginPage from "./pages/login/loginPage";
import DonationPage from "./pages/Donation/donationPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ display: "flex" }}>
          <Sidebar style={{ height: "100vh" }} />
          <main className="content" style={{ flex: "1 auto" }}>
            <Topbar />
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/Donation" element={<DonationPage />} />

              {/* if path doesn't exist, show 404 error page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;