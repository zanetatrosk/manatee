import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Characters from "@pages/charactersPage";
import HomePage from "@pages/homePage";
import { Container } from "@mui/material";
import ContentPage from "@pages/contentPage";
import CreateCharacter from "@pages/createCharacter";
import CharacterSheet from "@pages/characterSheet";
import EditCharacter from "features/editCharacter/editCharacter";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Navbar />
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
              <Route path="/characters" element={<Characters />} />
              <Route path="/content" element={<ContentPage />} />
              <Route
                path="/characters/create-character"
                element={<CreateCharacter />}
              />
              <Route path="/characters/:id/character-sheet"
                element={<CharacterSheet />}
              />
              <Route path="/characters/create-character/:id"
                element={<EditCharacter />}
              />
              <Route
                path="/*"
                element={<div>No route here</div>}
              />
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
