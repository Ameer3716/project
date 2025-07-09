// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Dashboard Pages
import DashboardOverview from './pages/DashboardOverview';
import CallManager from './pages/CallManager';
import Scheduler from './pages/Scheduler';
import CRMSync from './pages/CRMSync';
import Reports from './pages/Reports';
import ChatbotPage from './pages/ChatbotPage';
import AIStudio from './pages/AIStudio';
import CallFlows from './pages/CallFlows';
import TeamHub from './pages/TeamHub';
import AgentManagement from './pages/AgentManagement';
import AdvancedAnalytics from './pages/AdvancedAnalytics';
import WhiteLabel from './pages/WhiteLabel';
import SupportCenter from './pages/SupportCenter';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0C0A1D]">
          <Navbar />
          <Routes>
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardOverview />} />
              <Route path="call-manager" element={<CallManager />} />
              <Route path="scheduler" element={<Scheduler />} />
              <Route path="crm-sync" element={<CRMSync />} />
              <Route path="reports" element={<Reports />} />
              <Route path="chatbot" element={<ChatbotPage />} />
              <Route path="ai-studio" element={<AIStudio />} />
              <Route path="call-flows" element={<CallFlows />} />
              <Route path="team-hub" element={<TeamHub />} />
              <Route path="agent-management" element={<AgentManagement />} />
              <Route path="advanced-analytics" element={<AdvancedAnalytics />} />
              <Route path="white-label" element={<WhiteLabel />} />
              <Route path="support-center" element={<SupportCenter />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;