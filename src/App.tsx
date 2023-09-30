import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Characters from "@pages/Characters/charactersPage";
import CreateCharacter from "@pages/Characters/CreateCharacter/createCharacter";
import HomePage from "@pages/homePage";
import { Container } from "@mui/material";
import Footer from "@components/footer";
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
              mt: 9,
              mb: 4, 
            }}
            maxWidth="xl"
            component="main"
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/characters" element={<Characters />} />
              <Route
                path="/characters/create-character"
                element={<CreateCharacter />}
              />
            </Routes>
          </Container>
          <Footer/>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
