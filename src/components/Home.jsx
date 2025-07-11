// src/Homepage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView,useAnimation } from 'framer-motion';
import { 
  Menu, X, Phone, ArrowRight, Sparkles, Zap, Play, MapPin, Mail, 
  Facebook, Twitter, Linkedin, Instagram, ArrowUpRight, Settings, 
  Radio, CheckCircle, Clock, FileText, ChevronLeft, ChevronRight, 
  Users, BarChart3, Shield, TrendingUp, Quote, Star
} from 'lucide-react';

import './Home.css';
const Avatar = ({ animate }) => (
  <motion.div animate={animate} className="relative w-16 h-20">
    <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-radial-gradient from-[#00FFFF]/50 to-transparent" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#00FFFF]" style={{ filter: 'blur(5px)' }}/>
    <motion.div 
      className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#E42289] opacity-70" 
      style={{ filter: 'blur(10px)' }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.div>
);

const ParticleBurst = ({ controls }) => (
  <motion.div className="absolute top-1/2 left-1/2" animate={controls}>
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full"
        custom={i}
        variants={{
          initial: { x: 0, y: 0, opacity: 0, scale: 0 },
          burst: (i) => ({
            x: (Math.cos((i / 8) * 2 * Math.PI) * 40),
            y: (Math.sin((i / 8) * 2 * Math.PI) * 40),
            opacity: [1, 0],
            scale: [1, 0],
            transition: { duration: 0.5, ease: 'easeOut' }
          })
        }}
        initial="initial"
      />
    ))}
  </motion.div>
);

// ==========================================================================
// Hero Section Component
// ==========================================================================
const HeroSection = () => {
  const [robotVisible, setRobotVisible] = useState(false);
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const fullHeroGreeting = "Hello! Ready to automate your conversations?";
  const heroWords = ["Automate", "Transform", "Revolutionize", "Optimize"];
  
  const typingIntervalRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const wordIntervalRef = useRef(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setRobotVisible(true), 500);
    const timer2 = setTimeout(() => setGreetingVisible(true), 1500);

    wordIntervalRef.current = setInterval(() => {
      setCurrentWordIndex(prev => (prev + 1) % heroWords.length);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (wordIntervalRef.current) clearInterval(wordIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!greetingVisible) return;

    const startTypingAnimation = () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      setTypedText('');
      let i = 0;
      typingIntervalRef.current = setInterval(() => {
        if (i < fullHeroGreeting.length) {
          setTypedText(prev => prev + fullHeroGreeting.charAt(i));
          i++;
        } else {
          if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
          typingTimeoutRef.current = setTimeout(startTypingAnimation, 3000);
        }
      }, 50);
    };

    startTypingAnimation();

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [greetingVisible]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-[#0C0A1D] flex items-center pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#E42289]/10 via-transparent to-[#00FFFF]/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(228, 34, 137, 0.1), transparent, rgba(0, 255, 255, 0.1))",
              "linear-gradient(135deg, rgba(0, 255, 255, 0.1), transparent, rgba(228, 34, 137, 0.1))",
              "linear-gradient(45deg, rgba(228, 34, 137, 0.1), transparent, rgba(0, 255, 255, 0.1))"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E42289]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00FFFF]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00FFFF] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants} className="mb-6">
              <motion.span
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 rounded-full border border-white/10 text-sm text-gray-300 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles size={16} className="mr-2 text-[#00FFFF]" />
                AI-Powered Call Automation
              </motion.span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F0F0F0] mb-6 leading-tight"
            >
              <motion.span
                key={currentWordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent"
              >
                {heroWords[currentWordIndex]}
              </motion.span>{" "}
              Your Business Communications
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
            >
              Leverage cutting-edge AI to handle every call, 24/7. Transform your customer interactions with intelligent automation that feels completely human.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="/login"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(228, 34, 137, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg font-semibold text-white transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Zap size={20} className="mr-2" />
                  Start Free Trial
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg blur opacity-0 group-hover:opacity-50"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg font-semibold text-white transition-all duration-300 group overflow-hidden"
              >
                <span className="flex items-center justify-center">
                  <Play size={20} className="mr-2" />
                  Watch Demo
                </span>
              </motion.button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-gray-500"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#00FFFF] rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm">No Setup Required</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#00FFFF] rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm">14-Day Free Trial</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#00FFFF] rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm">Cancel Anytime</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={robotVisible ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className="w-64 h-64 relative"
              >
                <motion.div
                  className="w-full h-full bg-gradient-to-br from-[#E42289]/20 to-[#00FFFF]/20 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(0, 255, 255, 0.3)",
                      "0 0 40px rgba(228, 34, 137, 0.3)",
                      "0 0 20px rgba(0, 255, 255, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <motion.div
                    className="w-32 h-32 bg-gradient-to-br from-[#E42289] to-[#00FFFF] rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.div
                      className="w-4 h-4 bg-white rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.div>

                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-[#00FFFF] rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: `${80 + i * 20}px 0px`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.5
                    }}
                  />
                ))}
              </motion.div>

              {greetingVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute -top-16 -left-32 w-80"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 relative">
                    <p className="text-[#F0F0F0] font-medium h-[50px] flex items-center">
                      {typedText}
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="ml-1"
                      >
                        |
                      </motion.span>
                    </p>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                      <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/10"></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================================================
// Trusted By Section Component
// ==========================================================================
const TrustedBySection = () => {
  const trustedCompanies = [
    'Google', 'Microsoft', 'Amazon', 'Stripe', 'Shopify', 
    'Slack', 'Meta', 'Vercel', 'Notion', 'Figma'
  ];

  return (
    <section className="py-16 bg-[#0C0A1D]/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gray-400 text-sm uppercase tracking-wider">
            Trusted by industry leaders worldwide
          </p>
        </motion.div>
        
        <div className="relative w-full overflow-hidden mask-image-gradient">
          <motion.div
            className="flex animate-infinite-scroll"
            style={{
              width: 'calc(200% + 2rem)',
            }}
          >
            {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-48 text-center opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer group"
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl font-bold text-[#F0F0F0] group-hover:text-[#00FFFF] transition-colors duration-300">
                  {company}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ==========================================================================
// How It Works Section Component
// ==========================================================================
const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const howItWorksSteps = [
    {
      number: 1,
      title: "Connect Your Number",
      description: "Seamlessly integrate your existing phone system with our AI platform in under 5 minutes.",
      icon: Phone,
      graphic: "phone-connect",
      details: ["No technical setup required", "Works with any phone system", "Instant activation"]
    },
    {
      number: 2,
      title: "Configure Your AI Agent",
      description: "Customize your AI assistant with your business rules, tone, and specific requirements.",
      icon: Settings,
      graphic: "dashboard-config",
      details: ["Custom conversation flows", "Brand voice training", "Integration setup"]
    },
    {
      number: 3,
      title: "Go Live & Scale",
      description: "Start automating calls instantly and watch your efficiency soar with real-time analytics.",
      icon: Radio,
      graphic: "soundwaves",
      details: ["24/7 automated handling", "Real-time monitoring", "Continuous optimization"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % howItWorksSteps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const renderGraphic = (graphicType) => {
    // ... (graphic rendering logic remains the same)
        switch (graphicType) {
      case 'phone-connect':
        return (
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-[#E42289] to-[#00FFFF] rounded-xl flex items-center justify-center mb-4"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0, 255, 255, 0.3)",
                  "0 0 40px rgba(228, 34, 137, 0.5)",
                  "0 0 20px rgba(0, 255, 255, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Phone size={32} className="text-white" />
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#00FFFF] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        );
      case 'dashboard-config':
        return (
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            whileHover={{ scale: 1.02 }}
          >
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <motion.div
                    className={`h-2 rounded-full ${
                      i === 0 ? 'w-20 bg-gradient-to-r from-[#E42289] to-[#00FFFF]' :
                      i === 1 ? 'w-16 bg-gray-600' :
                      'w-24 bg-gradient-to-r from-[#E42289] to-[#00FFFF]'
                    }`}
                    animate={i !== 1 ? {
                      opacity: [0.5, 1, 0.5]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <motion.div
                    className={`w-8 h-4 rounded-full ${
                      i !== 1 ? 'bg-[#00FFFF]' : 'bg-gray-600'
                    }`}
                    animate={i !== 1 ? {
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      case 'soundwaves':
        return (
          <div className="flex items-center justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 bg-gradient-to-t from-[#E42289] to-[#00FFFF] rounded-full"
                style={{ height: `${20 + Math.random() * 40}px` }}
                animate={{
                  scaleY: [1, 2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 bg-gradient-to-br from-[#0C0A1D] to-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16 "
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
            Get Started in <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">3 Simple Steps</span>
          </motion.h2>
        
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-700 transform -translate-y-1/2">
            <motion.div
              className="h-full bg-gradient-to-r from-[#E42289] to-[#00FFFF]"
              initial={{ width: "0%" }}
              animate={{ width: `${((activeStep + 1) / howItWorksSteps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {howItWorksSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative text-center transition-all duration-500 ${isActive ? 'scale-105' : 'scale-100'}`}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  <motion.div
                    className={`relative z-10 w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500 ${
                      isActive ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white shadow-2xl' : 'bg-white/10 text-gray-400 border border-white/20'
                    }`}
                    animate={isActive ? { boxShadow: ["0 0 20px rgba(0, 255, 255, 0.3)", "0 0 40px rgba(228, 34, 137, 0.5)", "0 0 20px rgba(0, 255, 255, 0.3)"] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {step.number}
                  </motion.div>
                  <motion.div
                    className="mb-6 flex justify-center"
                    animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderGraphic(step.graphic)}
                  </motion.div>
                  <motion.div className={`transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                    <h3 className="text-2xl font-bold text-[#F0F0F0] mb-4">{step.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{step.description}</p>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={isActive ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          className="flex items-center justify-center text-sm text-gray-400"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: detailIndex * 0.1 }}
                        >
                          <CheckCircle size={16} className="text-[#00FFFF] mr-2 flex-shrink-0" />
                          {detail}
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
          <motion.div variants={itemVariants} className="flex justify-center mt-12 space-x-2">
            {howItWorksSteps.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeStep ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] w-8' : 'bg-white/20 w-2 hover:bg-white/40'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================================================
// Features Section Component
// ==========================================================================
const FeaturesSection = () => {
    // ... (logic and JSX remain the same, just remove type annotations)
  const [currentFeatureSlide, setCurrentFeatureSlide] = useState(0);
  const featureIntervalRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const featuresList = [
    {
      title: "24/7 Inbound Handling",
      description: "Never miss a call again. Our AI handles all incoming calls with human-like conversation and intelligent routing.",
      icon: Clock,
      mockup: "inbound-calls",
      benefits: ["Zero missed calls", "Instant response", "Smart routing", "Multi-language support"]
    },
    {
      title: "Intelligent Outbound Dialing",
      description: "Automate your sales and follow-up calls with smart targeting, personalization, and optimal timing.",
      icon: Phone,
      mockup: "outbound-dialing",
      benefits: ["Smart targeting", "Perfect timing", "Personalized scripts", "Higher conversion rates"]
    },
    {
      title: "Live Call Transcription",
      description: "Get real-time transcripts of all conversations with sentiment analysis and actionable insights.",
      icon: FileText,
      mockup: "transcription",
      benefits: ["Real-time transcripts", "Sentiment analysis", "Key insights", "Searchable history"]
    },
    {
      title: "Seamless CRM Integration",
      description: "Connect with your existing CRM and business tools for automated data sync and workflow optimization.",
      icon: Zap,
      mockup: "crm-integration",
      benefits: ["Auto data sync", "Workflow automation", "Custom integrations", "Real-time updates"]
    }
  ];

  useEffect(() => {
    startFeatureAutoScroll();
    return () => {
      if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);
    };
  }, []);

  const startFeatureAutoScroll = () => {
    if (featureIntervalRef.current) clearInterval(featureIntervalRef.current);
    featureIntervalRef.current = setInterval(() => {
      setCurrentFeatureSlide(prev => (prev + 1) % featuresList.length);
    }, 5000);
  };

  const handleFeatureNavClick = (index) => {
    setCurrentFeatureSlide(index);
    startFeatureAutoScroll();
  };

  const handleFeatureArrowClick = (direction) => {
    setCurrentFeatureSlide(prev => {
      if (direction === 'next') return (prev + 1) % featuresList.length;
      return (prev - 1 + featuresList.length) % featuresList.length;
    });
    startFeatureAutoScroll();
  };

  const renderFeatureMockup = (mockupType) => {
    const mockupVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };
    // ... Mockup rendering logic ...
    switch (mockupType) {
      case 'inbound-calls':
        return (
          <motion.div
            variants={mockupVariants}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <motion.div
                className="w-3 h-3 bg-[#00FFFF] rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-gray-300">Incoming Call</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <div>
                  <motion.div
                    className="w-24 h-2 bg-gray-600 rounded-full mb-1"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="w-16 h-2 bg-gray-700 rounded-full" />
                </div>
              </div>
              <motion.div
                className="bg-[#00FFFF]/20 rounded-lg p-3"
                animate={{ boxShadow: ["0 0 10px rgba(0,255,255,0.2)", "0 0 20px rgba(0,255,255,0.4)", "0 0 10px rgba(0,255,255,0.2)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-full h-2 bg-[#00FFFF] rounded-full mb-2" />
                <div className="w-3/4 h-2 bg-[#00FFFF] rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        );
      case 'outbound-dialing':
        return (
          <motion.div
            variants={mockupVariants}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300"
          >
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
                    i < 3 ? 'bg-[#E42289] text-white' : 'bg-white/10 text-gray-300'
                  }`}
                  animate={i < 3 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                >
                  {i + 1}
                </motion.div>
              ))}
            </div>
            <motion.div
              className="w-full h-1 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        );
      case 'transcription':
        return (
          <motion.div
            variants={mockupVariants}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <motion.div
                  className="w-2 h-2 bg-[#00FFFF] rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-xs text-gray-400">Live Transcription</span>
              </div>
              <div className="space-y-2">
                <motion.div
                  className="bg-[#E42289]/20 rounded-lg p-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-full h-1 bg-[#E42289] rounded-full mb-1" />
                  <div className="w-4/5 h-1 bg-[#E42289] rounded-full" />
                </motion.div>
                <motion.div
                  className="bg-[#00FFFF]/20 rounded-lg p-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="w-full h-1 bg-[#00FFFF] rounded-full mb-1" />
                  <div className="w-3/5 h-1 bg-[#00FFFF] rounded-full" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      case 'crm-integration':
        return (
          <motion.div
            variants={mockupVariants}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="bg-[#E42289]/20 rounded-lg p-3 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-4 h-4 bg-[#E42289] rounded-full mx-auto mb-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="w-8 h-1 bg-[#E42289] rounded-full mx-auto" />
              </motion.div>
              <motion.div
                className="bg-[#00FFFF]/20 rounded-lg p-3 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-4 h-4 bg-[#00FFFF] rounded-full mx-auto mb-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <div className="w-8 h-1 bg-[#00FFFF] rounded-full mx-auto" />
              </motion.div>
            </div>
            <div className="mt-4 flex justify-center">
              <motion.div
                className="w-16 h-1 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="features" ref={sectionRef} className="py-24 bg-[#0C0A1D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 rounded-full border border-white/10 text-sm text-gray-300">
              <Sparkles size={16} className="mr-2 text-[#00FFFF]" />
              Powerful Features
            </span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
            Everything You Need, <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">and More</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentFeatureSlide * 100}%)` }}
            >
              {featuresList.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <motion.div className="text-center lg:text-left" variants={itemVariants}>
                        <div className="w-16 h-16 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
                          <Icon size={32} className="text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-[#F0F0F0] mb-4">{feature.title}</h3>
                        <p className="text-lg text-gray-300 max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed">
                          {feature.description}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <motion.div
                              key={benefitIndex}
                              className="flex items-center text-sm text-gray-400"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: benefitIndex * 0.1 + 0.5 }}
                            >
                              <div className="w-2 h-2 bg-[#00FFFF] rounded-full mr-2 flex-shrink-0" />
                              {benefit}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                      <motion.div className="flex justify-center lg:justify-end" variants={itemVariants}>
                        <div className="w-full max-w-md">
                          {renderFeatureMockup(feature.mockup)}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="flex justify-center mt-12 space-x-4">
            <motion.button onClick={() => handleFeatureArrowClick('prev')} className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-[#E42289]/20 transition-all duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ChevronLeft size={24} className="text-[#F0F0F0]" />
            </motion.button>
            <div className="flex items-center space-x-2">
              {featuresList.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleFeatureNavClick(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentFeatureSlide ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] w-6' : 'bg-white/20 w-3 hover:bg-white/40'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
            <motion.button onClick={() => handleFeatureArrowClick('next')} className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-[#E42289]/20 transition-all duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ChevronRight size={24} className="text-[#F0F0F0]" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


// ==========================================================================
// Product Showcase Section Component
// ==========================================================================
const ProductShowcaseSection = () => {
    // ... (logic and JSX remain the same, just remove type annotations)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const showcaseStats = [
    {
      id: 'calls',
      title: "Calls Today",
      value: "1,247",
      icon: Phone,
      iconBg: 'bg-[#E42289]/20',
      iconColor: 'text-[#E42289]',
      description: "Track your daily call volume in real-time. This metric reflects all inbound and outbound calls processed by your AI agents, giving you an instant overview of daily activity and engagement.",
      trend: "+12%",
      change: "vs yesterday"
    },
    {
      id: 'success',
      title: "Success Rate",
      value: "98.5%",
      icon: Users,
      iconBg: 'bg-[#00FFFF]/20',
      iconColor: 'text-[#00FFFF]',
      description: "Our success rate measures the percentage of calls where the AI successfully understood the user's intent and completed its designated task. This high rate demonstrates the reliability and effectiveness of our conversational AI.",
      trend: "+2.3%",
      change: "this week"
    },
    {
      id: 'response',
      title: "Avg Response",
      value: "1.2s",
      icon: BarChart3,
      iconBg: 'bg-[#E42289]/20',
      iconColor: 'text-[#E42289]',
      description: "Average response time is the speed at which our AI responds after the user finishes speaking. A lightning-fast response time ensures conversations are natural, fluid, and free of awkward delays.",
      trend: "-0.3s",
      change: "improvement"
    },
    {
      id: 'availability',
      title: "Availability",
      value: "24/7",
      icon: Clock,
      iconBg: 'bg-[#00FFFF]/20',
      iconColor: 'text-[#00FFFF]',
      description: "Your AI agents are always on, 24 hours a day, 7 days a week. This guarantees that no customer call is ever missed, regardless of time zones, holidays, or business hours, providing unparalleled service.",
      trend: "100%",
      change: "uptime"
    }
  ];

  const openModal = (stat) => {
    setModalContent(stat);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#0C0A1D] to-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
            Your <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Command Center</span>
          </motion.h2>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 rounded-3xl blur-3xl" />
          <motion.div variants={itemVariants} className="relative bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E42289] to-[#00FFFF]" />
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <motion.div className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Phone size={20} className="text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-[#F0F0F0]">CallEase Dashboard</h3>
                  <p className="text-sm text-gray-400">Real-time call management</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div className="w-3 h-3 bg-[#00FFFF] rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="text-sm text-gray-300">Live</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {showcaseStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.id}
                    variants={itemVariants}
                    onClick={() => openModal(stat)}
                    className="bg-white/5 rounded-xl p-6 border border-white/10 cursor-pointer group hover:border-[#00FFFF]/50 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <motion.div className={`w-10 h-10 ${stat.iconBg} rounded-lg flex items-center justify-center`} whileHover={{ scale: 1.1 }}>
                        <Icon size={20} className={stat.iconColor} />
                      </motion.div>
                      <ArrowUpRight size={16} className="text-gray-500 group-hover:text-[#00FFFF] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <div className="text-3xl font-bold text-[#F0F0F0] mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400 mb-2">{stat.title}</div>
                    {stat.trend && (
                      <div className="flex items-center text-xs">
                        <TrendingUp size={12} className="text-[#00FFFF] mr-1" />
                        <span className="text-[#00FFFF] font-medium">{stat.trend}</span>
                        <span className="text-gray-500 ml-1">{stat.change}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
            <motion.div variants={itemVariants} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-[#F0F0F0]">Call Volume Analytics</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#E42289] rounded-full" />
                    <span className="text-sm text-gray-400">Inbound</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#00FFFF] rounded-full" />
                    <span className="text-sm text-gray-400">Outbound</span>
                  </div>
                </div>
              </div>
              <div className="flex items-end space-x-2 h-32">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end space-y-1">
                    <motion.div className="bg-gradient-to-t from-[#E42289] to-[#E42289]/50 rounded-t-sm" style={{ height: `${30 + Math.random() * 60}%` }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: i * 0.1 }} />
                    <motion.div className="bg-gradient-to-t from-[#00FFFF] to-[#00FFFF]/50 rounded-t-sm" style={{ height: `${20 + Math.random() * 40}%` }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: i * 0.1 + 0.5 }} />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-gradient-to-br from-[#1a1a2e] to-[#0C0A1D] rounded-2xl border border-white/20 p-8 shadow-2xl shadow-black/50"
            >
              <motion.button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <X size={24} />
              </motion.button>
              <div className="flex items-start space-x-4">
                <motion.div className={`flex-shrink-0 w-12 h-12 ${modalContent.iconBg} rounded-lg flex items-center justify-center`} whileHover={{ scale: 1.1 }}>
                  <modalContent.icon size={24} className={modalContent.iconColor} />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{modalContent.title}</h3>
                    {modalContent.trend && (
                      <div className="flex items-center text-sm">
                        <TrendingUp size={14} className="text-[#00FFFF] mr-1" />
                        <span className="text-[#00FFFF] font-medium">{modalContent.trend}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-[#00FFFF] mb-4">{modalContent.value}</div>
                  <p className="text-gray-300 leading-relaxed">{modalContent.description}</p>
                  {modalContent.change && (
                    <div className="mt-4 text-sm text-gray-400">
                      <span className="text-[#00FFFF]">{modalContent.change}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


// ==========================================================================
// Testimonials Section Component
// ==========================================================================
const TestimonialsSection = () => {
    // ... (logic and JSX remain the same, just remove type annotations)
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialIntervalRef = useRef(null);

  const testimonialsList = [
    {
      name: "Sarah Chen",
      company: "TechStart Inc.",
      role: "CEO",
      content: "CallEase transformed our customer service completely. We went from missing 30% of calls to handling 100% with better quality than before. The AI is incredibly natural and our customers love it.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
    },
    {
      name: "Michael Rodriguez",
      company: "Global Solutions",
      role: "Sales Director",
      content: "The AI is so natural, our customers can't tell the difference. Our conversion rates increased by 45% in just 3 months. It's like having our best sales rep available 24/7.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
    },
    {
      name: "Emily Johnson",
      company: "InnovateCorp",
      role: "Operations Manager",
      content: "The 24/7 availability is a game-changer. We're now serving customers across different time zones without any additional staff. The ROI has been incredible.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
    },
  ];

  useEffect(() => {
    startTestimonialAutoScroll();
    return () => {
      if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
    };
  }, []);

  const startTestimonialAutoScroll = () => {
    if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
    testimonialIntervalRef.current = setInterval(() => {
      handleTestimonialNav('next');
    }, 6000);
  };

  const handleTestimonialNav = (direction) => {
    const total = testimonialsList.length;
    if (direction === 'next') {
      setCurrentTestimonial(prev => (prev + 1) % total);
    } else {
      setCurrentTestimonial(prev => (prev - 1 + total) % total);
    }
    startTestimonialAutoScroll();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="testimonials" className="py-24 bg-[#0C0A1D] relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E42289]/10 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00FFFF]/10 rounded-full blur-3xl" animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2], }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
            Don't Just Take Our <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Word For It</span>
          </motion.h2>
        </motion.div>
        
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative w-full flex items-center justify-center" style={{ height: '600px' }}>
          <motion.button variants={itemVariants} onClick={() => handleTestimonialNav('prev')} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-[#E42289]/20 transition-all duration-300" whileHover={{ scale: 1.1, x: -5 }} whileTap={{ scale: 0.9 }}>
            <ChevronLeft size={24} className="text-[#F0F0F0]" />
          </motion.button>
          <motion.button variants={itemVariants} onClick={() => handleTestimonialNav('next')} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-[#E42289]/20 transition-all duration-300" whileHover={{ scale: 1.1, x: 5 }} whileTap={{ scale: 0.9 }}>
            <ChevronRight size={24} className="text-[#F0F0F0]" />
          </motion.button>

          <AnimatePresence mode="wait">
            {testimonialsList.map((testimonial, index) => {
              const total = testimonialsList.length;
              const offset = index - currentTestimonial;
              const normalizedOffset = (offset + Math.ceil(total / 2)) % total - Math.floor(total / 2);
              let scale = 0.8, opacity = 0.4, zIndex = 0, x = '0%', blur = 'blur(2px)';
              if (normalizedOffset === 0) { scale = 1; opacity = 1; zIndex = 3; blur = 'blur(0px)'; } 
              else if (normalizedOffset === 1) { x = '60%'; zIndex = 2; scale = 0.9; opacity = 0.6; } 
              else if (normalizedOffset === -1) { x = '-60%'; zIndex = 2; scale = 0.9; opacity = 0.6; } 
              else { opacity = 0; x = normalizedOffset > 0 ? '120%' : '-120%'; }

              return (
                <motion.div key={index} className="absolute w-full max-w-2xl" initial={{ x, scale, opacity, zIndex }} animate={{ x, scale, opacity, zIndex }} transition={{ type: 'spring', stiffness: 200, damping: 25, duration: 0.6 }} style={{ filter: blur }}>
                  <motion.div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center relative overflow-hidden" whileHover={normalizedOffset === 0 ? { scale: 1.02 } : {}}>
                    <motion.div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full flex items-center justify-center" animate={normalizedOffset === 0 ? { boxShadow: ["0 0 20px rgba(0, 255, 255, 0.3)", "0 0 40px rgba(228, 34, 137, 0.5)", "0 0 20px rgba(0, 255, 255, 0.3)"] } : {}} transition={{ duration: 3, repeat: Infinity }}>
                      <Quote size={24} className="text-white" />
                    </motion.div>
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 + 0.3 }}>
                          <Star size={20} className="text-[#00FFFF] fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    <motion.p className="text-lg text-[#F0F0F0] mb-8 italic leading-relaxed min-h-[120px] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                      "{testimonial.content}"
                    </motion.p>
                    <motion.div className="flex items-center justify-center space-x-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                      <motion.img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full border-2 border-[#00FFFF]/30" whileHover={{ scale: 1.1 }} />
                      <div className="text-left">
                        <div className="font-semibold text-[#F0F0F0] text-lg">{testimonial.name}</div>
                        <div className="text-[#00FFFF] text-sm font-medium">{testimonial.role}</div>
                        <div className="text-gray-400 text-sm">{testimonial.company}</div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <motion.div variants={itemVariants} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonialsList.map((_, index) => (
              <motion.button key={index} onClick={() => { setCurrentTestimonial(index); startTestimonialAutoScroll(); }} className={`h-2 rounded-full transition-all duration-300 ${ index === currentTestimonial ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] w-8' : 'bg-white/20 w-2 hover:bg-white/40' }`} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


// ==========================================================================
// CTA Section Component
// ==========================================================================

const CTASection = () => {
  // --- Standard Variants ---
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };

  // --- ANIMATION LOGIC ---
  const avatarControls = useAnimation();
  const featureControls = [useAnimation(), useAnimation(), useAnimation()];
  const particleControls = [useAnimation(), useAnimation(), useAnimation()];
  const glowControls = [useAnimation(), useAnimation(), useAnimation()]; // NEW: Controls for the gradient glow

  const animationRef = useRef(null);
  const isInView = useInView(animationRef, { once: true, amount: 0.4 });

  const features = [
    { icon: Shield, title: "Enterprise Security", description: "Bank-level encryption and compliance" },
    { icon: Zap, title: "99.9% Uptime", description: "Reliable service you can count on" },
    { icon: Sparkles, title: "24/7 Support", description: "Expert help whenever you need it" }
  ];

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        avatarControls.set({ opacity: 0, scale: 0.5, filter: 'blur(10px)', x: '50%', y: '50%' });
        await new Promise(resolve => setTimeout(resolve, 3000));

        for (let i = 0; i < 3; i++) {
          const xPos = `${(i * 33.3) + 16.5}%`;

          // 1. Avatar "Materializes"
          await avatarControls.start({
            x: xPos, opacity: [0, 1], scale: [0.5, 1], filter: ['blur(10px)', 'blur(0px)'],
            transition: { duration: 0.5, ease: 'easeOut' }
          });

          // 2. Avatar "Charges Up"
          await avatarControls.start({ scale: 1.1, transition: { duration: 0.2 } });

          // 3. Impact!
          await Promise.all([
            // Animate the box tilting and its border flashing
            featureControls[i].start({
              rotate: -5, borderColor: '#00FFFF',
              transition: { type: 'spring', stiffness: 400, damping: 10 }
            }),
            // NEW: Animate the gradient glow to appear
            glowControls[i].start({ opacity: 0.7, transition: { duration: 0.15 } }),
            avatarControls.start({ scale: 1, skewX: -10, transition: { duration: 0.1 } }),
            particleControls[i].start('burst')
          ]);

          // 4. Settle back
          await Promise.all([
            featureControls[i].start({
              rotate: 0, borderColor: 'rgba(255, 255, 255, 0.1)',
              transition: { type: 'spring', stiffness: 200, damping: 15 }
            }),
            // NEW: Make the gradient glow fade out
            glowControls[i].start({ opacity: 0, transition: { duration: 0.3 } }),
            avatarControls.start({ skewX: 0, transition: { duration: 0.3 } }),
            particleControls[i].start('initial')
          ]);

          // 5. Avatar "Dematerializes"
          await avatarControls.start({
            opacity: 0, scale: 0.5, filter: 'blur(10px)',
            transition: { duration: 0.5, ease: 'easeIn' }
          });
        }
      }
    };

    if (isInView) {
      sequence();
    }
  }, [isInView, avatarControls, featureControls, particleControls, glowControls]);

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-[#0C0A1D] via-[#1a1a2e] to-[#0C0A1D] relative overflow-hidden">
      {/* ... (Background Effects and Top Content remain the same) ... */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col text-center">
            {/* Top content like H2, P, and Button remain unchanged */}
            <motion.div variants={itemVariants} className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#E42289]/30 to-[#00FFFF]/30 rounded-full blur-3xl scale-150" />
            <div className="relative z-10">
              <motion.h2 className="text-5xl md:text-7xl font-bold text-[#F0F0F0] mb-8 leading-tight" animate={{ textShadow: ["0 0 20px rgba(0, 255, 255, 0.3)", "0 0 40px rgba(228, 34, 137, 0.5)", "0 0 20px rgba(0, 255, 255, 0.3)"] }} transition={{ duration: 3, repeat: Infinity }}>
                Ready to <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Revolutionize</span><br /> Your Business?
              </motion.h2>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="relative inline-block group mb-8">
            <motion.a href="/login" className="relative px-12 py-6 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-2xl font-bold text-white text-xl transition-all duration-300 overflow-hidden inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <span className="relative z-10 flex items-center">
                <Zap size={24} className="mr-3" />
                Start Your Free Trial Now
                <motion.div className="ml-3" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={24} />
                </motion.div>
              </span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-2xl blur opacity-0 group-hover:opacity-75" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} />
            </motion.a>
          </motion.div>
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-gray-400 text-sm mb-4">No credit card required • 14-day free trial • Cancel anytime</p>
          </motion.div>
          
          {/* Animation Container */}
          <div ref={animationRef} className="relative mt-8 h-48">
            <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    animate={featureControls[index]}
                    className="relative flex flex-col items-center text-center group"
                  >
                    {/* NEW: Gradient Glow Element - sits behind the content */}
                    <motion.div
                        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-2xl blur-lg"
                        initial={{ opacity: 0 }}
                        animate={glowControls[index]}
                    />

                    <motion.div className="w-16 h-16 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 rounded-xl flex items-center justify-center mb-4 border border-white/10 transition-all duration-300">
                      <Icon size={24} className="text-[#00FFFF]" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-[#F0F0F0] mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                    <ParticleBurst controls={particleControls[index]} />
                  </motion.div>
                );
              })}
            </div>
            
            <motion.div className="absolute top-0 -translate-y-1/2" style={{ left: 0 }}>
              <Avatar animate={avatarControls} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================================================
// Footer Component
// ==========================================================================



// ==========================================================================
// Main Homepage Component
// ==========================================================================
const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0C0A1D] overflow-x-hidden"
    >
      <main>
        <HeroSection />
        <TrustedBySection />
        <HowItWorksSection />
        <FeaturesSection />
        <ProductShowcaseSection />
        <TestimonialsSection />
        {/* PricingSection is intentionally excluded as requested */}
        <CTASection />
      </main>
      
    </motion.div>
  );
};

export default Home;