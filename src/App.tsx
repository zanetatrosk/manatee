import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Characters from "@pages/characters";
import { Container, PaletteMode } from "@mui/material";
import CreateCharacter from "@pages/createCharacter";
import CharacterSheet from "@pages/characterSheet";
import EditCharacter from "@pages/editCharacter";
import ContentPage from "@pages/content";
import HomePage from "@pages/home";
import { useAppSelector } from "@hooks/hooksStore";
import ErrorAlert from "@components/errorAlert";
import NoRoute from "@pages/noRoute";
import PATHS from "constants/paths";

function App() {
  const theme = useAppSelector((state) => state.theme);
  const useTheme = createTheme({
    palette: {
      mode: theme as PaletteMode,
    },
  });
  return (
    <div className="App">
      <Router>
        <ThemeProvider
          theme={useTheme}
        >
          <CssBaseline />
          <Navbar />
          <ErrorAlert />
          <Container
            sx={{
              mt: 6,
              mb: 4,
            }}
            maxWidth="lg"
            component="main"
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path={PATHS.CHARACTERS} element={<Characters />} />
              <Route path={PATHS.CONTENT} element={<ContentPage />} />
              <Route
                path={PATHS.CREATE_CHARACTER}
                element={<CreateCharacter />}
              />
              <Route
                path={PATHS.CHARACTER_SHEET + "/:id"}
                element={<CharacterSheet />}
              />
              <Route
                path={PATHS.CREATE_CHARACTER + "/:id"}
                element={<EditCharacter />}
              />
              <Route path="/*" element={<NoRoute />} />
            </Routes>
          </Container>
          {/* todo footer */}
          {/* <Footer/> */}
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
