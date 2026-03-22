import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import EntryPortal from './pages/EntryPortal';
import Diagnostics from './pages/Diagnostics';
import Debugger from './pages/Debugger';
import PRAnalysis from './pages/PRAnalysis';
import FixEngine from './pages/FixEngine';
import SimulationEngine from './pages/SimulationEngine';
import Observability from './pages/Observability';
import PolicyDashboard from './pages/PolicyDashboard';
import ResultsRanking from './pages/ResultsRanking';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryPortal />} />
        <Route element={<Layout />}>
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/debugger" element={<Debugger />} />
          <Route path="/pr-analysis" element={<PRAnalysis />} />
          <Route path="/fix-engine" element={<FixEngine />} />
          <Route path="/simulation" element={<SimulationEngine />} />
          <Route path="/observability" element={<Observability />} />
          <Route path="/policy" element={<PolicyDashboard />} />
          <Route path="/results" element={<ResultsRanking />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
