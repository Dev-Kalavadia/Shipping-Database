import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Main from "./pages/main";
import Voyages from "./pages/voyages";
import Ships from "./pages/ships";
import Places from "./pages/places";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/voyages" element={<Voyages />}/>
          <Route path="/ships" element={<Ships />}/>
          <Route path="/places" element={<Places />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
