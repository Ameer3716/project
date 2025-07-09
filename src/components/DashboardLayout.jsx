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
    <div className="min-h-screen bg-[#111827] relative overflow-hidden">
      {/* Data-Verse Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Base Deep Charcoal Background */}
        <div className="absolute inset-0 bg-[#111827]" />
        
        {/* Animated Grid Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="quantumGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00BFFF" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#quantumGrid)" />
          
          {/* Moving Grid Animation */}
          <motion.rect
            width="100%"
            height="100%"
            fill="url(#quantumGrid)"
            animate={{
              x: [0, 40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </svg>

        {/* Data Motes Particle System */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`mote-${i}`}
            className="absolute w-1 h-1 rounded-full pointer-events-none"
            style={{
              background: i % 3 === 0 ? '#FFFFFF' : i % 3 === 1 ? '#00BFFF' : '#39FF14',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, Math.random() * 150 - 75],
              y: [0, Math.random() * 200 - 100, Math.random() * 150 - 75],
              opacity: [0.3, 0.8, 0.5, 0.9, 0.3],
              scale: [1, 1.5, 1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}

        {/* Subtle Data Streams */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute opacity-10"
            style={{
              width: '1px',
              height: '100px',
              left: `${Math.random() * 100}%`,
              background: `linear-gradient(to bottom, transparent, #00BFFF, transparent)`,
            }}
            animate={{
              y: [typeof window !== 'undefined' ? window.innerHeight : 1000, -100],
              opacity: [0, 0.3, 0.5, 0.2, 0],
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Layout Container */}
      <div className="relative z-10 flex min-h-screen pt-20">
        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-6 left-4 z-50 p-3 bg-rgba(31, 41, 55, 0.3) backdrop-blur-[12px] border border-[#00BFFF]/30 rounded-xl text-[#D1D5DB]"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 0 20px rgba(0, 191, 255, 0.2)',
            borderColor: 'rgba(0, 191, 255, 0.6)'
          }}
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
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Command Core Sidebar */}
        <motion.div
          className={`
            fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-40
            w-80 h-screen lg:h-auto
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full h-full"
            >
              <Outlet />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;