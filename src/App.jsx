// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,useLocation} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Hooks and General Components
import useSmoothScroll from '../hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

// --- Public Facing Pages ---
import Home from './components/Home';
import Pricing from './components/Pricing';
import SuccessPage from './components/SuccessPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import BlogPage from './components/BlogPage';

// --- Dashboard Pages (New Structure) ---
import DashboardOverview from './pages/DashboardOverview';
import CallManager from './pages/CallManager';
import Scheduler from './pages/Scheduler';
import CRMSync from './pages/CRMSync';
import Reports from './pages/Reports';
import ChatbotPage from './pages/ChatbotPage'; // Use the single, correct import
import AIStudio from './pages/AIStudio';
import CallFlows from './pages/CallFlows';
import TeamHub from './pages/TeamHub';
import AgentManagement from './pages/AgentManagement';
import AdvancedAnalytics from './pages/AdvancedAnalytics';
import WhiteLabel from './pages/WhiteLabel';
import SupportCenter from './pages/SupportCenter';

const AppFooter = () => {
  const location = useLocation();
  // If the current path starts with /dashboard, don't render the footer
  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }
  return <Footer />;
};
function App() {
  useSmoothScroll();

  return (
    <AuthProvider>
      <Router>
        {/* Navbar is rendered for all pages, which is fine */}
        <Navbar />
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/success" element={<SuccessPage />} />
          {/* --- Protected Dashboard Routes --- */}
          <Route
            path="/dashboard" // Use path="/dashboard" for clarity, the Outlet handles nesting
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* The index route for /dashboard */}
            <Route index element={<DashboardOverview />} />

            {/* All tiered feature routes */}
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

          {/* Fallback route to redirect any unknown URL to the homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {/* Footer is rendered for all pages. See note below. */}
        <AppFooter />
      </Router>
    </AuthProvider>
  );
}

export default App;