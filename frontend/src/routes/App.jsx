import React from "react";
import { Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Browse from '../pages/Browse.jsx';
import PropertyDetails from '../pages/PropertyDetails.jsx';
import AgentDashboard from '../pages/AgentDashboard.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/agent" element={<AgentDashboard />} />
      </Routes>
      <footer className="mt-auto py-8 text-center text-sm text-gray-500">© HiTech</footer>
    </div>
  );
}
