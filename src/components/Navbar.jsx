// src/components/Navbar.jsx

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { AuthContext } from '../Contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleLogin = () => {
    closeMenu();
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    {name : 'Blog', path: '/blog'}
  ];

  const renderAuthLinks = (isMobile = false) => {
    if (loading) {
      return <div className="text-gray-400 text-sm animate-pulse">Checking status...</div>;
    }
  
    if (user) {
      return (
        <div className={`flex items-center gap-4 ${isMobile ? 'flex-col' : ''}`}>
          {user.isSubscribed && (
            <Link to="/dashboard" onClick={closeMenu} className="text-[#F0F0F0] hover:text-[#00FFFF] transition-colors duration-200">
              Dashboard
            </Link>
          )}
          <span className="text-gray-300">Hi, {user.name.split(' ')[0]}!</span>
        </div>
      );
    }
    return (
      <motion.button
      onClick={handleLogin}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-6 py-2 rounded-lg font-semibold transition-all duration-300 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 rounded-lg z-0"
        animate={{
          background: [
            'linear-gradient(to right, #E42289, #00FFFF)',
            'linear-gradient(to right, #00FFFF, #E42289)',
            'linear-gradient(to right, #E42289, #00FFFF)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.span
        className="relative z-10 text-white"
        animate={{ color: ['#ffffff', '#00FFFF', '#E42289', '#ffffff'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Login with Google
      </motion.span>
    </motion.button>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-xl bg-[#0C0A1D]/90 border-b border-white/10' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="flex items-center space-x-3">
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Phone size={20} className="text-white" />
            </motion.div>
            <span className="text-2xl font-bold text-[#F0F0F0]">CallEase</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#E42289] to-[#00FFFF] font-bold hover:text-[#00FFFF] transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#E42289] to-[#00FFFF] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            {renderAuthLinks()}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 text-[#F0F0F0]"
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-[#0C0A1D]/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 flex flex-col items-center space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="block text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#E42289] to-[#00FFFF] font-bold hover:text-[#00FFFF] transition-colors duration-200 py-2"
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className="pt-4 w-full flex justify-center"
              >
                {renderAuthLinks(true)}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
