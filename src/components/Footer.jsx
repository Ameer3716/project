// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';

/* Glowless Link with text color cycling */
const AnimatedLink = ({ to, href, children, className = '' }) => {
  const delay = Math.random(); // random start
  const Component = href ? 'a' : Link;

  return (
    <Component
      {...(href ? { href } : { to })}
      className={`relative ${className}`}
    >
      <motion.span
        className="relative z-10"
        initial={{ color: '#9CA3AF' }}
        animate={{ color: ['#E42289', '#00FFFF', '#E42289'] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
          delay
        }}
      >
        {children}
      </motion.span>
    </Component>
  );
};

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Facebook, href: '#', name: 'Facebook' }
  ];

  return (
    <footer
      id="contact"
      className="bg-gradient-to-br from-[#0C0A1D] to-[#1a1a2e] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Grid Top */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

            {/* Brand */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Phone size={20} className="text-white" />
                </motion.div>
                <span className="text-2xl font-bold text-[#F0F0F0]">CallEase</span>
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Transforming business communications with cutting‑edge AI technology.
                Never miss a call, never miss an opportunity.
              </p>

              <div className="space-y-3">
                <AnimatedLink href="mailto:support@callease.com" className="flex items-center text-sm">
                  <Mail size={16} className="mr-3" />
                  support@callease.com
                </AnimatedLink>
                <div className="flex items-center text-gray-400">
                  <MapPin size={16} className="mr-3" />
                  <span className="text-sm">London, UK</span>
                </div>
              </div>
            </motion.div>

            {/* Product Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-[#F0F0F0] font-semibold mb-4 tracking-wider">Product</h4>
              <ul className="space-y-3">
                <li><AnimatedLink to="/#features" className="text-sm">Features</AnimatedLink></li>
                <li><AnimatedLink to="/pricing" className="text-sm">Pricing</AnimatedLink></li>
                <li><AnimatedLink href="#" className="text-sm">Integrations</AnimatedLink></li>
                <li><AnimatedLink href="#" className="text-sm">Documentation</AnimatedLink></li>
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-[#F0F0F0] font-semibold mb-4 tracking-wider">Company</h4>
              <ul className="space-y-3">
                <li><AnimatedLink to="/about" className="text-sm">About Us</AnimatedLink></li>
                <li><AnimatedLink to="/contact" className="text-sm">Contact Us</AnimatedLink></li>
                <li><AnimatedLink href="#" className="text-sm">Careers</AnimatedLink></li>
                <li><AnimatedLink href="#" className="text-sm">Blog</AnimatedLink></li>
              </ul>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={itemVariants}>
              <h4 className="text-[#F0F0F0] font-semibold mb-4 tracking-wider">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, name }) => {
                  const delay = Math.random();
                  return (
                    <motion.a
                      key={name}
                      href={href}
                      aria-label={name}
                      initial={{ color: '#9CA3AF' }}
                      animate={{ color: ['#E42289', '#00FFFF', '#E42289'] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'loop',
                        delay
                      }}
                      className="text-lg"
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-8 border-t border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-[#F0F0F0] mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get the latest updates on AI call automation and industry insights.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FFFF] transition-colors duration-300"
              />
              <AnimatedLink href="#" className="px-6 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg font-semibold text-white text-center">
                Subscribe
              </AnimatedLink>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-center"
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CallEase. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            Made with ❤️ for better business communications.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
