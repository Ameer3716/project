import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Send, ChevronDown, BarChart3, Headphones,
  Globe, Linkedin, Twitter, Github, ArrowRight, Sparkles, Zap,
  MessageCircle, Users, Clock, Search, CheckCircle, AlertCircle,
  Book, HelpCircle, Star, Target, Wifi, Database
} from 'lucide-react';

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    reason: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Section 1: Hero Section - Establish a Direct Link
  const HeroSection = () => {
    const [connectionComplete, setConnectionComplete] = useState(false);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    useEffect(() => {
      if (isInView) {
        const timer = setTimeout(() => setConnectionComplete(true), 2000);
        return () => clearTimeout(timer);
      }
    }, [isInView]);

    // Light trail animation
    const lightTrails = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      delay: Math.random() * 2
    }));

    return (
      <section ref={sectionRef} className="min-h-screen relative overflow-hidden bg-[#0C0A1D] flex items-center pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#E42289]/10 via-transparent to-[#00FFFF]/10"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(228,34,137,0.1), transparent, rgba(0,255,255,0.1))",
                "linear-gradient(135deg, rgba(0,255,255,0.1), transparent, rgba(228,34,137,0.1))",
                "linear-gradient(45deg, rgba(228,34,137,0.1), transparent, rgba(0,255,255,0.1))"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Central Nexus Point */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0, 255, 255, 0.5)",
                  "0 0 40px rgba(228, 34, 137, 0.7)",
                  "0 0 60px rgba(0, 255, 255, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Light Trails Converging */}
          <AnimatePresence>
            {isInView && (
              <motion.div className="absolute inset-0">
                {lightTrails.map((trail) => (
                  <motion.div
                    key={trail.id}
                    className="absolute w-1 h-1 bg-[#00FFFF] rounded-full"
                    style={{ left: `${trail.startX}%`, top: `${trail.startY}%` }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: [`0%`, `${50 - trail.startX}vw`],
                      y: [`0%`, `${50 - trail.startY}vh`]
                    }}
                    transition={{
                      duration: 3,
                      delay: trail.delay,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Trail effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full blur-sm"
                      animate={{ scale: [1, 3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.h1 className="text-[#00FFFF] text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Your{" "}
              <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">
                Connection
              </span>{" "}
              to the Core.
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2.5 }}
            >
              Whether you have a question, a partnership proposal, or need technical support, 
              you've found the right channel. We're ready to listen.
            </motion.p>

            {/* Connection Status */}
            <motion.div
              className="flex items-center justify-center space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 3 }}
            >
              <motion.div
                className="w-3 h-3 bg-[#00FFFF] rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[#00FFFF] font-semibold">
                {connectionComplete ? "Connection Established" : "Establishing Connection..."}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Section 2: Primary Access Points
  const AccessPointsSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const accessPoints = [
      {
        icon: BarChart3,
        title: "Sales & Partnerships",
        description: "Interested in a demo, custom pricing, or exploring a partnership? Our growth team is ready to connect.",
        buttonText: "Talk to Sales",
        color: "cyan",
        gradient: "from-[#00FFFF]/20 to-[#00FFFF]/5"
      },
      {
        icon: Headphones,
        title: "Technical Support",
        description: "Facing a technical issue or need help with your setup? Our expert support team is on standby 24/7.",
        buttonText: "Get Support",
        color: "pink",
        gradient: "from-[#E42289]/20 to-[#E42289]/5"
      }
    ];

    const scrollToForm = () => {
      const formSection = document.getElementById('contact-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <section ref={sectionRef} className="py-24 bg-gradient-to-br from-[#0C0A1D] to-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[#F0F0F0] mb-4">
              Primary <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Access Points</span>
            </h2>
            <p className="text-xl text-gray-300">Choose your communication pathway</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {accessPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                  whileHover={{ scale: 1.02, y: -10 }}
                  className="group cursor-pointer"
                >
                  <motion.div
                    className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full bg-gradient-to-br ${point.gradient}`}
                    whileHover={{
                      borderColor: point.color === 'cyan' ? '#00FFFF' : '#E42289',
                      boxShadow: point.color === 'cyan' 
                        ? "0 25px 50px rgba(0, 255, 255, 0.3)" 
                        : "0 25px 50px rgba(228, 34, 137, 0.3)"
                    }}
                  >
                    {/* Animated background glow */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${
                        point.color === 'cyan' 
                          ? 'from-[#00FFFF]/10 to-transparent' 
                          : 'from-[#E42289]/10 to-transparent'
                      } opacity-0 group-hover:opacity-100`}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-r ${
                          point.color === 'cyan' 
                            ? 'from-[#00FFFF]/20 to-[#00FFFF]/10' 
                            : 'from-[#E42289]/20 to-[#E42289]/10'
                        } border border-white/20`}
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          boxShadow: [
                            `0 0 20px ${point.color === 'cyan' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(228, 34, 137, 0.3)'}`,
                            `0 0 40px ${point.color === 'cyan' ? 'rgba(0, 255, 255, 0.5)' : 'rgba(228, 34, 137, 0.5)'}`,
                            `0 0 20px ${point.color === 'cyan' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(228, 34, 137, 0.3)'}`
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <Icon size={32} className={point.color === 'cyan' ? 'text-[#00FFFF]' : 'text-[#E42289]'} />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-[#F0F0F0] mb-4 group-hover:text-[#00FFFF] transition-colors duration-300">
                        {point.title}
                      </h3>

                      <p className="text-gray-300 leading-relaxed mb-8">
                        {point.description}
                      </p>

                      <motion.button
                        onClick={scrollToForm}
                        className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${
                          point.color === 'cyan' 
                            ? 'from-[#00FFFF] to-[#00FFFF]/80' 
                            : 'from-[#E42289] to-[#E42289]/80'
                        } text-white`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center justify-center">
                          {point.buttonText}
                          <ArrowRight size={20} className="ml-2" />
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  // Section 3: The Contact Form - Transmit Your Message
  const ContactFormSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    };

    const reasonOptions = [
      "Sales Inquiry",
      "Support Request", 
      "Partnership",
      "General Question",
      "Technical Issue",
      "Feature Request"
    ];

    return (
      <section id="contact-form" ref={sectionRef} className="py-24 bg-[#0C0A1D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[#F0F0F0] mb-4">
              <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Direct</span> Transmission
            </h2>
            <p className="text-xl text-gray-300">Send your message through our secure communication channel</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 rounded-3xl blur-xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 }}
                      >
                        <label className="block text-sm font-medium text-[#F0F0F0] mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 }}
                      >
                        <label className="block text-sm font-medium text-[#F0F0F0] mb-2">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          name="workEmail"
                          value={formData.workEmail}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
                          placeholder="your.email@company.com"
                        />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.7 }}
                      >
                        <label className="block text-sm font-medium text-[#F0F0F0] mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
                          placeholder="Your company name"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.8 }}
                      >
                        <label className="block text-sm font-medium text-[#F0F0F0] mb-2">
                          Reason for Contact *
                        </label>
                        <div className="relative">
                          <select
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300 appearance-none"
                          >
                            <option value="" className="bg-[#1a1a2e] text-gray-300">Select a reason</option>
                            {reasonOptions.map((option) => (
                              <option key={option} value={option} className="bg-[#1a1a2e] text-gray-300">
                                {option}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.9 }}
                    >
                      <label className="block text-sm font-medium text-[#F0F0F0] mb-2">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300 resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1 }}
                      className="flex justify-center"
                    >
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative px-12 py-4 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-xl font-bold text-white text-lg transition-all duration-300 overflow-hidden group disabled:opacity-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10 flex items-center">
                          {isSubmitting ? (
                            <>
                              <motion.div
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send size={20} className="mr-3" />
                              Send Message
                            </>
                          )}
                        </span>

                        {/* Data stream animation on submit */}
                        {isSubmitting && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full flex items-center justify-center mx-auto mb-6"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(0, 255, 255, 0.5)",
                          "0 0 40px rgba(228, 34, 137, 0.7)",
                          "0 0 20px rgba(0, 255, 255, 0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle size={40} className="text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-[#F0F0F0] mb-4">Message Transmitted!</h3>
                    <p className="text-gray-300 text-lg">
                      Your message has been successfully sent. Our team will respond within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Section 4: Our Global Nexus
  const GlobalNexusSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const globalHubs = [
      { name: "London", x: 50, y: 35, primary: true },
      { name: "New York", x: 25, y: 40, primary: false },
      { name: "Singapore", x: 80, y: 65, primary: false },
      { name: "Tokyo", x: 85, y: 45, primary: false },
      { name: "Sydney", x: 90, y: 80, primary: false }
    ];

    const [hoveredHub, setHoveredHub] = useState(null);

    return (
      <section ref={sectionRef} className="py-24 bg-gradient-to-br from-[#0C0A1D] to-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[#F0F0F0] mb-4">
              Our Global <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Nexus</span>
            </h2>
            <p className="text-xl text-gray-300">Connected across continents, unified in purpose</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Stylized World Map */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative w-full h-96 bg-gradient-to-br from-[#E42289]/10 to-[#00FFFF]/10 rounded-2xl border border-white/20 overflow-hidden">
                {/* Simplified world map background */}
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    <path
                      d="M50,80 Q100,60 150,80 T250,90 Q300,85 350,95 L350,120 Q300,110 250,115 T150,105 Q100,100 50,105 Z"
                      fill="currentColor"
                      className="text-[#F0F0F0]"
                    />
                    <path
                      d="M80,130 Q120,125 160,130 T240,135 L240,155 Q200,150 160,155 T80,150 Z"
                      fill="currentColor"
                      className="text-[#F0F0F0]"
                    />
                  </svg>
                </div>

                {/* Global Hubs */}
                {globalHubs.map((hub, index) => (
                  <motion.div
                    key={hub.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    onMouseEnter={() => setHoveredHub(hub.name)}
                    onMouseLeave={() => setHoveredHub(null)}
                  >
                    <motion.div
                      className={`w-4 h-4 rounded-full ${
                        hub.primary ? 'bg-[#E42289]' : 'bg-[#00FFFF]'
                      }`}
                      animate={{
                        scale: hoveredHub === hub.name ? 1.5 : 1,
                        boxShadow: [
                          `0 0 10px ${hub.primary ? 'rgba(228, 34, 137, 0.5)' : 'rgba(0, 255, 255, 0.5)'}`,
                          `0 0 20px ${hub.primary ? 'rgba(228, 34, 137, 0.8)' : 'rgba(0, 255, 255, 0.8)'}`,
                          `0 0 10px ${hub.primary ? 'rgba(228, 34, 137, 0.5)' : 'rgba(0, 255, 255, 0.5)'}`
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Hub label */}
                    <AnimatePresence>
                      {hoveredHub === hub.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm text-white whitespace-nowrap"
                        >
                          {hub.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {globalHubs.slice(1).map((hub, index) => (
                    <motion.line
                      key={index}
                      x1={`${globalHubs[0].x}%`}
                      y1={`${globalHubs[0].y}%`}
                      x2={`${hub.x}%`}
                      y2={`${hub.y}%`}
                      stroke="url(#connectionGradient)"
                      strokeWidth="1"
                      opacity="0.6"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ delay: index * 0.3 + 1, duration: 1 }}
                    />
                  ))}
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E42289" />
                      <stop offset="100%" stopColor="#00FFFF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            {/* Address Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-[#F0F0F0] mb-6">Our Command Center</h3>
                
                <div className="space-y-6">
                  <motion.div
                    className="flex items-start space-x-4"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 rounded-lg flex items-center justify-center border border-white/20">
                      <MapPin size={20} className="text-[#00FFFF]" />
                    </div>
                    <div>
                      <p className="text-[#F0F0F0] font-semibold">Headquarters</p>
                      <p className="text-gray-300">CallEase HQ, 123 Future Drive</p>
                      <p className="text-gray-300">Tech City, London, UK</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 rounded-lg flex items-center justify-center border border-white/20">
                      <Mail size={20} className="text-[#E42289]" />
                    </div>
                    <div>
                      <p className="text-[#F0F0F0] font-semibold">Email</p>
                      <a href="mailto:connect@callease.com" className="text-[#00FFFF] hover:text-[#E42289] transition-colors">
                        connect@callease.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 rounded-lg flex items-center justify-center border border-white/20">
                      <Phone size={20} className="text-[#00FFFF]" />
                    </div>
                    <div>
                      <p className="text-[#F0F0F0] font-semibold">Phone</p>
                      <a href="tel:+442012345678" className="text-[#00FFFF] hover:text-[#E42289] transition-colors">
                        +44 20 1234 5678
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Status indicators */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="bg-white/5 rounded-xl p-4 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-3 h-3 bg-[#00FFFF] rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-sm text-gray-300">24/7 Online</span>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/5 rounded-xl p-4 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-3 h-3 bg-[#E42289] rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    <span className="text-sm text-gray-300">Global Coverage</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  // Section 5: Knowledge Core Access
  const KnowledgeCoreSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
      <section ref={sectionRef} className="py-24 bg-[#0C0A1D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[#F0F0F0] mb-4">
              Knowledge Core <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Access</span>
            </h2>
            <p className="text-xl text-gray-300">Instant answers at your fingertips</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 rounded-3xl blur-xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 text-center">
              {/* Scanning animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FFFF]/10 to-transparent h-full w-full rounded-3xl"
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative z-10">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-2xl flex items-center justify-center mx-auto mb-8"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(0, 255, 255, 0.3)",
                      "0 0 40px rgba(228, 34, 137, 0.5)",
                      "0 0 20px rgba(0, 255, 255, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Book size={40} className="text-white" />
                </motion.div>

                <h3 className="text-3xl font-bold text-[#F0F0F0] mb-6">Instant Answers Await</h3>
                
                <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                  Many common questions are already answered in our comprehensive knowledge base. 
                  You might find what you're looking for instantly.
                </p>

                <motion.button
                  className="relative px-10 py-4 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-xl font-bold text-white text-lg transition-all duration-300 overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center">
                    <Search size={20} className="mr-3" />
                    Explore the Knowledge Base
                    <ArrowRight size={20} className="ml-3" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-xl blur opacity-0 group-hover:opacity-75"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                {/* Popular topics */}
                <motion.div
                  className="mt-8 flex flex-wrap justify-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  {["Getting Started", "API Documentation", "Troubleshooting", "Billing", "Integrations"].map((topic, index) => (
                    <motion.span
                      key={topic}
                      className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10 hover:border-[#00FFFF]/50 hover:text-[#00FFFF] transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      {topic}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Section 6: Join the Collective
  const CollectiveSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const socialPlatforms = [
      {
        icon: Linkedin,
        name: "LinkedIn",
        color: "#0077B5",
        glowColor: "rgba(0, 255, 255, 0.5)",
        href: "#"
      },
      {
        icon: Twitter,
        name: "Twitter",
        color: "#1DA1F2",
        glowColor: "rgba(228, 34, 137, 0.5)",
        href: "#"
      },
      {
        icon: Github,
        name: "GitHub",
        color: "#333",
        glowColor: "rgba(0, 255, 255, 0.5)",
        href: "#"
      }
    ];

    return (
      <section ref={sectionRef} className="py-24 bg-gradient-to-br from-[#0C0A1D] to-[#1a1a2e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[#F0F0F0] mb-4">
              Connect with the <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Community</span>
            </h2>
            <p className="text-xl text-gray-300">Join thousands of developers and businesses in our growing ecosystem</p>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {socialPlatforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <motion.a
                  key={platform.name}
                  href={platform.href}
                  className="group relative"
                  initial={{ opacity: 0, y: 50, rotateY: -30 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -10,
                    rotateY: 10,
                    boxShadow: `0 20px 40px ${platform.glowColor}`
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 transition-all duration-300 group-hover:border-[#00FFFF]/50"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(255, 255, 255, 0.1)",
                        "0 0 30px rgba(0, 255, 255, 0.3)",
                        "0 0 20px rgba(255, 255, 255, 0.1)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <Icon size={32} className="text-gray-400 group-hover:text-[#00FFFF] transition-colors duration-300" />
                  </motion.div>

                  {/* Platform name tooltip */}
                  <motion.div
                    className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    {platform.name}
                  </motion.div>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle, ${platform.glowColor} 0%, transparent 70%)`
                    }}
                  />
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 }}
          >
            <p className="text-gray-400 text-sm">
              Follow us for the latest updates, insights, and community discussions
            </p>
          </motion.div>
        </div>
      </section>
    );
  };

  return (
    <>
      
      <div className="contact-us-page-container">
        <HeroSection />
        <AccessPointsSection />
        <ContactFormSection />
        <GlobalNexusSection />
        <KnowledgeCoreSection />
        <CollectiveSection />
      </div>
     
    </>
  );
};

export default ContactPage;