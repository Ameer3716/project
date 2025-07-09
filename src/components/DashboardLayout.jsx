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
    <div className="min-h-screen bg-[#0C0A1D] relative overflow-hidden">
      {/* Immersive Animated Background System */}
      <div className="fixed inset-0 z-0">
        {/* Base Deep Indigo Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C0A1D] via-[#1a1a3e] to-[#0C0A1D]" />
        
        {/* Plexus Network - Procedural Lines and Nodes */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E42289" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {[...Array(25)].map((_, i) => {
            const x1 = Math.random() * 100;
            const y1 = Math.random() * 100;
            const x2 = Math.random() * 100;
            const y2 = Math.random() * 100;
            return (
              <motion.line
                key={i}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.4, 0],
                  x1: [`${x1}%`, `${x1 + (Math.random() - 0.5) * 20}%`],
                  y1: [`${y1}%`, `${y1 + (Math.random() - 0.5) * 20}%`],
                  x2: [`${x2}%`, `${x2 + (Math.random() - 0.5) * 20}%`],
                  y2: [`${y2}%`, `${y2 + (Math.random() - 0.5) * 20}%`],
                }}
                transition={{
                  duration: Math.random() * 10 + 8,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear"
                }}
              />
            );
          })}
          
          {/* Network Nodes */}
          {[...Array(15)].map((_, i) => {
            const cx = Math.random() * 100;
            const cy = Math.random() * 100;
            return (
              <motion.circle
                key={`node-${i}`}
                cx={`${cx}%`}
                cy={`${cy}%`}
                r="2"
                fill={i % 2 === 0 ? "#E42289" : "#00FFFF"}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1.5, 1],
                  opacity: [0, 0.8, 0.4, 0.8],
                  cx: [`${cx}%`, `${cx + (Math.random() - 0.5) * 30}%`],
                  cy: [`${cy}%`, `${cy + (Math.random() - 0.5) * 30}%`],
                }}
                transition={{
                  duration: Math.random() * 12 + 8,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            );
          })}
        </svg>

        {/* Data Orbs with Burst Effect */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${Math.random() * 80 + 30}px`,
              height: `${Math.random() * 80 + 30}px`,
              left: `${Math.random() * 100}%`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(228, 34, 137, 0.3) 0%, rgba(228, 34, 137, 0.1) 40%, transparent 70%)'
                : 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, rgba(0, 255, 255, 0.1) 40%, transparent 70%)',
              boxShadow: i % 2 === 0 
                ? '0 0 40px rgba(228, 34, 137, 0.2)'
                : '0 0 40px rgba(0, 255, 255, 0.2)',
            }}
            initial={{ 
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
              scale: 0.3,
              opacity: 0
            }}
            animate={{
              y: -150,
              scale: [0.3, 1, 1.2, 0.8, 0],
              opacity: [0, 0.6, 0.8, 0.4, 0],
              x: [0, Math.random() * 100 - 50, Math.random() * 150 - 75],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear"
            }}
            onAnimationIteration={() => {
              // Burst effect simulation
              if (Math.random() > 0.85) {
                // Create visual burst particles
                const burstCount = Math.floor(Math.random() * 8) + 4;
                for (let j = 0; j < burstCount; j++) {
                  const particle = document.createElement('div');
                  particle.className = 'absolute w-1 h-1 rounded-full pointer-events-none z-10';
                  particle.style.background = i % 2 === 0 ? '#E42289' : '#00FFFF';
                  particle.style.left = `${Math.random() * 100}%`;
                  particle.style.top = `${Math.random() * 100}%`;
                  particle.style.animation = `burstParticle 1.5s ease-out forwards`;
                  document.body.appendChild(particle);
                  
                  setTimeout(() => {
                    if (particle.parentNode) {
                      particle.parentNode.removeChild(particle);
                    }
                  }, 1500);
                }
              }
            }}
          />
        ))}

        {/* Flowing Data Streams */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute opacity-40"
            style={{
              width: '2px',
              height: '300px',
              left: `${Math.random() * 100}%`,
              background: `linear-gradient(to bottom, transparent, ${i % 2 === 0 ? '#E42289' : '#00FFFF'}, transparent)`,
            }}
            animate={{
              y: [typeof window !== 'undefined' ? window.innerHeight : 1000, -300],
              opacity: [0, 0.6, 0.8, 0.4, 0],
              scaleY: [0.5, 1, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}

        {/* Large Aurora Glows */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, #E42289 0%, transparent 60%)',
            top: '5%',
            left: '15%',
          }}
          animate={{
            scale: [1, 1.4, 1.1, 1.3, 1],
            opacity: [0.05, 0.15, 0.08, 0.12, 0.05],
            x: [0, 50, -30, 20, 0],
            y: [0, -20, 40, -10, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, #00FFFF 0%, transparent 60%)',
            bottom: '10%',
            right: '10%',
          }}
          animate={{
            scale: [1.2, 1, 1.5, 1.1, 1.2],
            opacity: [0.08, 0.18, 0.06, 0.14, 0.08],
            x: [0, -40, 60, -20, 0],
            y: [0, 30, -50, 15, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, delay: 5 }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, #9333EA 0%, transparent 60%)',
            top: '40%',
            right: '30%',
          }}
          animate={{
            scale: [1.1, 1.3, 1, 1.4, 1.1],
            opacity: [0.06, 0.12, 0.04, 0.16, 0.06],
            x: [0, 30, -40, 10, 0],
            y: [0, -25, 35, -15, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 8 }}
        />
      </div>

      {/* CSS Animation for Burst Particles */}
      <style jsx>{`
        @keyframes burstParticle {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: scale(0) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
            opacity: 0;
          }
        }
      `}</style>

      {/* Layout Container */}
      <div className="relative z-10 flex min-h-screen pt-20">
        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-6 left-4 z-50 p-3 bg-rgba(255, 255, 255, 0.05) backdrop-blur-[12px] border border-rgba(255, 255, 255, 0.2) rounded-xl text-[#F0F0F0]"
          whileHover={{ scale: 1.05 }}
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

        {/* Sidebar with Aurora Glow */}
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
          <div className="relative">
            {/* Sidebar Aurora Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 rounded-3xl blur-xl opacity-60" />
            <div className="relative bg-rgba(12, 10, 29, 0.8) backdrop-blur-[12px] border border-rgba(255, 255, 255, 0.2) rounded-2xl h-full">
              <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
            </div>
          </div>
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