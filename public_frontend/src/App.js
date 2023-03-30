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
import Homepage from "./pages/Homepage/Homepage";
import DonationPage from "./pages/Donation/donationPage";
import TestimonialPage from "./pages/Testimonial/testimonialPage";
import EventsAndMarketingPage from "./pages/EventsAndMarketing/EventsAndMarketingPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ContactUsPage from "./pages/ContactUs/ContactUsPage";
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
import AdoptionFosteringPage from "./pages/Adoption_Fostering/AdoptionFosteringPage";
import CreateAnimalListingPage from "./pages/CreateAnimalListing/CreateAnimalListing";
import CreateEventListingPage from "./pages/CreateEventListing/CreateEventListing";
import UserProvider from "./helpers/context/UserProvider";
import ManageApplicationForm from "./pages/ManageApplicationForm/ManageApplicationForm";
import ChatPage from "./pages/Chat/chatPage";


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
        <div className="app" style={{ display: "flex" }}>
          <Sidebar style={{height: "100vh"}}/>
          <main className="content" style={{ flex: "1 auto" }}>
            <Topbar />
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/ManageApplicationForm" element={<ManageApplicationForm />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/Homepage" element={<Homepage />} />
              <Route exact path="/AboutUs" element={<AboutUsPage />} />
              <Route exact path="/AdoptionFostering" element={<AdoptionFosteringPage/>} />
              <Route exact path="/Donation" element={<DonationPage />} />
              <Route exact path="/Testimonial" element={<TestimonialPage />} />
              <Route exact path='/EventsAndMarketing' element={<EventsAndMarketingPage/>} />
              <Route exact path="/Contact" element={<ContactUsPage />} />
              <Route exact path="/CreateAnimalListing" element={<CreateAnimalListingPage />} />
              <Route exact path="/CreateEventListing" element={<CreateEventListingPage />} />
              <Route exact path="/chat" element={<ChatPage />} />


              {/* if path doesn't exist, show 404 error page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
        </UserProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;