import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import PendingApprovals from './pages/PendingApprovals';
import ActiveProperties from './pages/ActiveProperties'; 
import Reports from './pages/Reports'; 
import Support from './pages/Support'; // 🚀 Naya Support Import

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', height: '100vh', backgroundColor: '#f8fafc' }}>
        <Sidebar />
        <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Topbar />
          <div className="page-content" style={{ padding: '24px', overflowY: 'auto' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/inventory" element={<ActiveProperties />} />
              <Route path="/pending-approvals" element={<PendingApprovals />} /> 
              <Route path="/reports" element={<Reports />} /> 
              
              {/* 🚀 Naya Support Route */}
              <Route path="/support" element={<Support />} /> 
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;