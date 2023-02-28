//import "./app.css";
import Layout from "./components/Layout/Layout";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content"></main>
            <Topbar/>
        </div>
      </ThemeProvider>
      {/* Once you comment out Layout below, the topbar that Jun Bin created would work. Once Layout is uncommented, it would not work. */}
      <Layout /> 
    </ColorModeContext.Provider>
  );
}

export default App;
