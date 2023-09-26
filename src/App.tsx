import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Characters from "@pages/Characters/page";
import CreateCharacter from "@pages/Characters/CreateCharacter/page";
import { Container } from "@mui/material";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
              mt: 7,
            }}
            maxWidth="xl"
          >
            <Routes>
              <Route path="/" element={<h1>Home Page</h1>} />
              <Route path="/characters" element={<Characters />} />
              <Route
                path="/characters/create-character"
                element={<CreateCharacter />}
              />
            </Routes>
          </Container>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
