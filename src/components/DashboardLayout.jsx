// DashboardLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0C0A1D' }}>
      {/* Background elements unchanged */}

      {/* Layout Container */}
      <div className="relative z-10 flex min-h-screen pt-20">
        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-16 left-4 z-[60] p-2 backdrop-blur-[10px] border border-[#00FFFF]/30 rounded-xl text-[#F0F0F0]"
          style={{ backgroundColor: 'rgba(22, 21, 48, 0.6)' }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isSidebarOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </motion.button>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Fixed sidebar container */}
        <motion.div
          className={`
            fixed left-0 top-0 bottom-0 lg:relative lg:translate-x-0 
            transition-transform duration-300 ease-in-out z-40
            w-80 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          className="flex-1 relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-6 lg:p-8 min-h-screen">
            <Outlet />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;