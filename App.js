// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QRScan from "./QRScan";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import Signup from "./Signup";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRScan />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}
