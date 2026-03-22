import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import EntryPortal from './pages/EntryPortal';
import ModelSelection from './pages/ModelSelection';
import Diagnostics from './pages/Diagnostics';
import Debugger from './pages/Debugger';
import PRAnalysis from './pages/PRAnalysis';
import SimulationEngine from './pages/SimulationEngine';
import Observability from './pages/Observability';
import PolicyDashboard from './pages/PolicyDashboard';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryPortal />} />
        <Route path="/select-model" element={<ModelSelection />} />
        <Route element={<Layout />}>
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/debugger" element={<Debugger />} />
          <Route path="/pr-analysis" element={<PRAnalysis />} />
          <Route path="/simulation" element={<SimulationEngine />} />
          <Route path="/observability" element={<Observability />} />
          <Route path="/policy" element={<PolicyDashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
