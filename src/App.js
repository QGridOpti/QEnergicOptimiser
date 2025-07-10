
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import MicrogridOptimizer from './components/MicroGridOptimiser';
import MainPage from "./components/MainPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/optimizer" element={<MicrogridOptimizer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
