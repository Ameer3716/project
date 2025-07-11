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
      {/* Immersive Animated Background System */}
      <div className="fixed inset-0 z-0">
        {/* Base Deep Indigo Background */}
        <div className="absolute inset-0" style={{ backgroundColor: '#0C0A1D' }} />
        
        {/* Floating Data Orbs */}

        {/* Vertical Data Streams */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute opacity-30"
            style={{
              width: '2px',
              height: '200px',
              left: `${Math.random() * 100}%`,
              background: `linear-gradient(to bottom, transparent, ${i % 2 === 0 ? '#E42289' : '#00FFFF'}, transparent)`,
            }}
            animate={{
              y: [typeof window !== 'undefined' ? window.innerHeight : 1000, -200],
              opacity: [0, 0.6, 0.8, 0.4, 0],
              scaleY: [0.5, 1, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
          />
        ))}

        {/* Large Aurora Glows */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, #E42289 0%, transparent 60%)',
            top: '10%',
            left: '20%',
          }}
          animate={{
            scale: [1, 1.3, 1.1, 1.2, 1],
            opacity: [0.08, 0.18, 0.12, 0.15, 0.08],
            x: [0, 40, -20, 15, 0],
            y: [0, -15, 30, -8, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, #00FFFF 0%, transparent 60%)',
            bottom: '15%',
            right: '15%',
          }}
          animate={{
            scale: [1.1, 1, 1.4, 1.2, 1.1],
            opacity: [0.12, 0.20, 0.08, 0.16, 0.12],
            x: [0, -30, 50, -15, 0],
            y: [0, 25, -40, 12, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, delay: 4 }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, #9333EA 0%, transparent 60%)',
            top: '45%',
            right: '25%',
          }}
          animate={{
            scale: [1.2, 1.4, 1, 1.3, 1.2],
            opacity: [0.10, 0.18, 0.06, 0.20, 0.10],
            x: [0, 25, -35, 8, 0],
            y: [0, -20, 30, -12, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, delay: 6 }}
        />
      </div>

      {/* Layout Container */}
      <div className="relative z-10 flex min-h-screen pt-20">
        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-6 left-4 z-50 p-3 backdrop-blur-[10px] border border-[#00FFFF]/30 rounded-xl text-[#F0F0F0]"
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
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Holographic Sidebar */}
        <motion.div
          className={`
            fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-40
            w-80 h-screen lg:h-auto
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          // REMOVED: The conflicting initial, animate, and transition props.
          // The sidebar's position is now correctly controlled by the conditional
          // Tailwind CSS classes above, which works with the `transition-transform` class.
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