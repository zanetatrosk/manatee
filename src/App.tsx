import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Characters from "@pages/Characters/page";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/characters" element={<Characters />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
