// src/pages/PricingPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Check, X, Shield, TrendingUp, Headphones, ChevronDown, ChevronUp,
  Sparkles, Zap, ArrowRight, Phone, Star, Users, Clock, BarChart3,
  MessageCircle, Calendar, Settings, Database, Globe, Award
} from 'lucide-react';
import TypingHeadline from './TypingHeadline'; // Adjust path if needed
import AnimatedBorderContainer from './AnimatedBorderContainer'; // Adjust path if needed
import { loadStripe } from '@stripe/stripe-js';
const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [openFAQ, setOpenFAQ] = useState(null);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
  
  // Hero Section
  const HeroSection = () => {
    const [billingCycle, setBillingCycle] = useState("monthly");
  
    /* ---------------- framer‑motion variants (unchanged) ---------------- */
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 },
      },
    };
  
    const itemVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    };
  
    /* ------------------------------------------------------------------- */
    return (
      <>
        <section className="min-h-screen relative overflow-hidden bg-[#0C0A1D] flex items-center pt-20">
          {/* ---------------------- animated background --------------------- */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#E42289]/10 via-transparent to-[#00FFFF]/10"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(228,34,137,0.1), transparent, rgba(0,255,255,0.1))",
                  "linear-gradient(135deg, rgba(0,255,255,0.1), transparent, rgba(228,34,137,0.1))",
                  "linear-gradient(45deg, rgba(228,34,137,0.1), transparent, rgba(0,255,255,0.1))",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
  
            {/* aurora blobs (unchanged) */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E42289]/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00FFFF]/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
  
            {/* data sparks (unchanged) */}
            {[...Array(15)].map((_, i) => (
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
                  y: [0, -100, -200],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
  
          {/* --------------------------- foreground -------------------------- */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              {/* ---------- 1. heading – typewriter + gradient ------------- */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight overflow-hidden whitespace-nowrap border-r-2 border-[#00FFFF] typing-text"
              >
                The&nbsp;Perfect&nbsp;Plan&nbsp;for&nbsp;Your&nbsp;Ambition
              </motion.h1>
  
              {/* ---------- 2. paragraph – gradient + pulse ---------------- */}
              <motion.p
                variants={itemVariants}
                className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent animate-pulse"
              >
                No hidden fees. No surprises. Just powerful AI call automation,
                ready to scale with you. Choose the plan that fits your business
                goals.
              </motion.p>
  
              {/* ---------- 3. billing toggle – clockwise border ---------- */}
              <motion.div variants={itemVariants} className="flex items-center justify-center mb-16">
                <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20 gradient-border-clockwise">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      onClick={() => setBillingCycle("monthly")}
                      className={`relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        billingCycle === "monthly"
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {billingCycle === "monthly" && (
                        <motion.div
                          layoutId="billing-toggle"
                          className="absolute inset-0 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">Monthly</span>
                    </motion.button>
  
                    <motion.button
                      onClick={() => setBillingCycle("yearly")}
                      className={`relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        billingCycle === "yearly"
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {billingCycle === "yearly" && (
                        <motion.div
                          layoutId="billing-toggle"
                          className="absolute inset-0 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center">
                        Yearly
                        <span className="ml-2 text-xs bg-[#00FFFF]/20 px-2 py-1 rounded-full">
                          Save&nbsp;20%
                        </span>
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
  
        {/* ---------------- extra CSS (only what Tailwind can’t do) -------- */}
        <style>{`
          /* --- 1. typing effect (2 s loop with blinking caret) --- */
          @keyframes typing {
            0%   { width: 0 }
            100% { width: 100% }
          }
          @keyframes blink-caret {
            0%, 100% { border-color: transparent }
            50%      { border-color: #00FFFF }
          }
          .typing-text {
            animation:
              typing 4s steps(36, end) infinite alternate,
              blink-caret 2.75s step-end infinite;
            background: linear-gradient(to right, #E42289, #00FFFF);
            -webkit-background-clip: text;
            color: transparent;
          }
  
          /* --- 3. clockwise animated gradient border ------------------- */
          .gradient-border-clockwise {
            position: relative;
            overflow: hidden;
          }
          .gradient-border-clockwise::before,
          .border-gradient-anticlockwise::before {
            content: "";
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            padding: 2px; /* border thickness */
            background: conic-gradient(#E42289, #00FFFF, #E42289);
            -webkit-mask: 
              linear-gradient(#000 0 0) content-box,
              linear-gradient(#000 0 0);
            -webkit-mask-composite: xor;
                    mask-composite: exclude;
            z-index: -1;
          }
          .gradient-border-clockwise::before {
            animation: spin-cw 4s linear infinite;
          }
          .border-gradient-anticlockwise::before {
            animation: spin-ccw 4s linear infinite;
          }
          @keyframes spin-cw  { to { transform: rotate(360deg);  } }
          @keyframes spin-ccw { to { transform: rotate(-360deg); } }
  
          /* --- 5. bouncy utility for feature boxes ---------------------- */
          .bouncy { animation: bounce 2s infinite; }
        `}</style>
      </>
    );
  };
  

  // Main Pricing Tiers
  const PricingTiers = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // 2. Define the handleSubscribe function for Stripe checkout
    const handleSubscribe = async (planId) => {
        try {
            // Fetch current user from the backend to check for login status
            const userRes = await fetch(`${API_BASE_URL}/api/user`, {
                credentials: 'include' // Important for sending cookies/session info
            });

            if (!userRes.ok) {
                // If not logged in (e.g., 401 Unauthorized), prompt for login
                alert("Please log in or sign up before subscribing!");
                // Optionally, redirect to login page: window.location.href = '/login';
                return;
            }

            // Get the user email from the response
            const userData = await userRes.json();
            const email = userData.email;
            console.log("User email for checkout:", email);

            // Create Stripe Checkout session by calling the backend
            const response = await fetch(`${API_BASE_URL}/api/stripe/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ planId, email })
            });

            const sessionData = await response.json();
            console.log("Stripe session response:", sessionData);

            if (!sessionData.sessionId) {
                console.error("No sessionId received from the backend.");
                alert("Could not initiate checkout. Please try again.");
                return;
            }

            // Redirect to Stripe's hosted checkout page
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: sessionData.sessionId });

        } catch (error) {
            console.error("Error during checkout process:", error);
            alert("An error occurred. Please check the console for details.");
        }
    };

    // 3. Updated plans array with monthly-only pricing and a planId
    const plans = [
      {
        name: "PRO",
        planId: 'pro', // Unique ID for this plan
        price: 99,
        features: [
          "Complete Inbound & Outbound Handling",
          "Automated Appointment Scheduling", 
          "10 Concurrent Connections",
          "Seamless CRM Synchronization",
          "Enhanced Reporting Suite"
        ],
        buttonText: "Get Started",
        popular: false
      },
      {
        name: "GROWTH",
        planId: 'growth', // Unique ID for this plan
        price: 249,
        features: [
          "All Pro Features Included",
          "Customizable AI Responses",
          "Advanced Call Routing",
          "25 Concurrent Connections", 
          "Team Collaboration Dashboard"
        ],
        buttonText: "Get Started",
        popular: false
      },
      {
        name: "AGENCY",
        planId: 'agency', // Unique ID for this plan
        price: 499,
        features: [
          "Full-Scale Multi-Agent Management",
          "Priority Support & Integrations",
          "Unlimited Call Handling",
          "Branded White-Label Solutions",
          "Custom Analytics & Insights"
        ],
        buttonText: "Get Started",
        popular: true
      }
    ];

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      }
    };

    return (
      <section ref={sectionRef} className="py-24 bg-gradient-to-br ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                className={`relative ${plan.popular ? 'lg:scale-110 lg:-mt-8' : ''}`}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(0, 255, 255, 0.3)",
                        "0 0 40px rgba(228, 34, 137, 0.5)",
                        "0 0 20px rgba(0, 255, 255, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </motion.div>
                )}
                
                <motion.div 
                  className={`relative rounded-2xl overflow-hidden p-[2px] ${
                    plan.popular 
                      ? 'shadow-2xl shadow-[#00FFFF]/20' 
                      : ''
                  }`}
                  whileHover={{ 
                    scale: plan.popular ? 1.02 : 1.05,
                    boxShadow: plan.popular 
                      ? "0 25px 50px rgba(0, 255, 255, 0.3)" 
                      : "0 20px 40px rgba(228, 34, 137, 0.2)"
                  }}
                >
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent rounded-2xl"
                    style={{
                      background: `conic-gradient(from 0deg, #E42289, #00FFFF, #E42289)`,
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      padding: "2px",
                      borderRadius: "16px"
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className={`relative text-1xl bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-[15px] p-8 border border-transparent transition-all duration-300 h-full `}>
                    {plan.popular && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        animate={{
                          background: [
                            "linear-gradient(45deg, rgba(228, 34, 137, 0.1), transparent, rgba(0, 255, 255, 0.1))",
                            "linear-gradient(135deg, rgba(0, 255, 255, 0.1), transparent, rgba(228, 34, 137, 0.1))",
                            "linear-gradient(45deg, rgba(228, 34, 137, 0.1), transparent, rgba(0, 255, 255, 0.1))"
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    )}
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-[#F0F0F0] mb-2">{plan.name}</h3>
                      
                      <div className="mb-6">
                        <div className="flex items-baseline">
                          <span className="text-5xl font-bold text-[#F0F0F0]">£{plan.price}</span>
                          <span className="text-black-400 ml-2">/month</span>
                        </div>
                      </div>

                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: featureIndex * 0.1 + 0.5 }}
                          >
                            <Check size={20} className="text-[#00FFFF] mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <motion.button
                        // 4. Added onClick handler to the button
                        onClick={() => handleSubscribe(plan.planId)}
                        className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                          plan.popular
                            ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white shadow-lg'
                            : 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] border border-white/20 hover:bg-white/20'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {plan.buttonText}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
};


  // Feature Comparison Table
  const FeatureComparison = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const features = [
      { name: "Inbound Call Handling", pro: true, growth: true, agency: true },
      { name: "Outbound Dialing", pro: true, growth: true, agency: true },
      { name: "CRM Integration", pro: true, growth: true, agency: true },
      { name: "Basic Analytics", pro: true, growth: true, agency: true },
      { name: "Concurrent Connections", pro: "10", growth: "25", agency: "Unlimited" },
      { name: "Custom AI Responses", pro: false, growth: true, agency: true },
      { name: "Advanced Call Routing", pro: false, growth: true, agency: true },
      { name: "Team Collaboration", pro: false, growth: true, agency: true },
      { name: "White-Label Solutions", pro: false, growth: false, agency: true },
      { name: "Priority Support", pro: false, growth: false, agency: true },
      { name: "Custom Analytics", pro: false, growth: false, agency: true },
      { name: "Multi-Agent Management", pro: false, growth: false, agency: true }
    ];

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
      }
    };

    const rowVariants = {
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" }
      }
    };

    return (
      <section ref={sectionRef} className="py-24 bg-[#0C0A1D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
              <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Declassified</span> Technical Specs
            </h2>
            <p className="text-xl text-gray-300">Compare features across all plans</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden"
          >
            {/* Table Header */}
            <motion.div
              variants={rowVariants}
              className="grid grid-cols-4 gap-4 p-6 border-b border-white/10 bg-white/5"
            >
              <div className="font-semibold text-[#F0F0F0]">Features</div>
              <div className="text-center">
                <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent font-bold">
                  PRO
                </span>
              </div>
              <div className="text-center">
                <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent font-bold">
                  GROWTH
                </span>
              </div>
              <div className="text-center">
                <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent font-bold">
                  AGENCY
                </span>
              </div>
            </motion.div>

            {/* Table Rows */}
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                variants={rowVariants}
                className="grid grid-cols-4 gap-4 p-6 border-b border-white/5 hover:bg-white/5 transition-all duration-300 group"
                whileHover={{ backgroundColor: "rgba(0, 255, 255, 0.05)" }}
              >
                <div className="text-[#F0F0F0] group-hover:text-[#00FFFF] transition-colors duration-300">
                  {feature.name}
                </div>
                <div className="text-center">
                  {typeof feature.pro === 'boolean' ? (
                    feature.pro ? (
                      <Check size={20} className="text-[#00FFFF] mx-auto" />
                    ) : (
                      <X size={20} className="text-gray-500 mx-auto" />
                    )
                  ) : (
                    <span className="text-[#00FFFF] font-semibold">{feature.pro}</span>
                  )}
                </div>
                <div className="text-center">
                  {typeof feature.growth === 'boolean' ? (
                    feature.growth ? (
                      <Check size={20} className="text-[#00FFFF] mx-auto" />
                    ) : (
                      <X size={20} className="text-gray-500 mx-auto" />
                    )
                  ) : (
                    <span className="text-[#00FFFF] font-semibold">{feature.growth}</span>
                  )}
                </div>
                <div className="text-center">
                  {typeof feature.agency === 'boolean' ? (
                    feature.agency ? (
                      <Check size={20} className="text-[#00FFFF] mx-auto" />
                    ) : (
                      <X size={20} className="text-gray-500 mx-auto" />
                    )
                  ) : (
                    <span className="text-[#00FFFF] font-semibold">{feature.agency}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  };

  // CallEase Advantage Section
  const CallEaseAdvantage = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const advantages = [
      {
        icon: Shield,
        title: "Enterprise Security",
        description: "Bank-level encryption and full compliance to keep your data secure."
      },
      {
        icon: TrendingUp,
        title: "99.9% Uptime SLA",
        description: "Built on a resilient infrastructure you can count on, guaranteed."
      },
      {
        icon: Headphones,
        title: "24/7 Expert Support",
        description: "Our team of AI specialists is available around the clock to help you succeed."
      }
    ];

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3, delayChildren: 0.2 }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" }
      }
    };

    // Continuous bounce animation
    const continuousBounce = {
      animate: {
        y: [0, -15, 0],
        transition: {
          duration: .5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }
      }
    };

    // Particle burst animation for icons
    const ParticleBurst = ({ delay = 0 }) => (
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full"
            style={{
              top: '50%',
              left: '50%',
            }}
            variants={{
              hidden: { x: 0, y: 0, opacity: 0, scale: 0 },
              visible: {
                x: (Math.cos((i / 8) * 2 * Math.PI) * 40),
                y: (Math.sin((i / 8) * 2 * Math.PI) * 40),
                opacity: [1, 0],
                scale: [1, 0],
                transition: { duration: 0.8, ease: 'easeOut' }
              }
            }}
          />
        ))}
      </motion.div>
    );

    return (
      <section ref={sectionRef} className="py-24 bg-gradient-to-br from-[#0C0A1D] to-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
              The <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">CallEase</span> Advantage
            </h2>
            <p className="text-xl text-gray-300">Why industry leaders choose our platform</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <motion.div
                  key={advantage.title}
                  variants={itemVariants}
                  className="text-center group"
                >
                  <motion.div
                    className="relative w-24 h-24 mx-auto mb-6"
                    animate="animate"
                    variants={continuousBounce}
                  >
                    <motion.div
                      className="w-full h-full bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-sm"
                      animate={isInView ? {
                        boxShadow: [
                          "0 0 20px rgba(0, 255, 255, 0.3)",
                          "0 0 40px rgba(228, 34, 137, 0.5)",
                          "0 0 20px rgba(0, 255, 255, 0.3)"
                        ]
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : {}}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                      >
                        <Icon size={32} className="text-[#00FFFF]" />
                      </motion.div>
                    </motion.div>
                    <ParticleBurst delay={index * 0.2 + 0.8} />
                  </motion.div>
                  
                  <motion.h3
                    className="text-2xl font-bold text-[#F0F0F0] mb-4 group-hover:text-[#00FFFF] transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2 + 1 }}
                  >
                    {advantage.title}
                  </motion.h3>
                  
                  <motion.p
                    className="text-gray-300 leading-relaxed max-w-sm mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2 + 1.2 }}
                  >
                    {advantage.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    );
  };
  // FAQ Section
  const FAQSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const faqs = [
      {
        question: "How quickly can I get started with CallEase?",
        answer: "You can be up and running in under 5 minutes. Simply connect your phone number, configure your AI agent with our intuitive setup wizard, and start handling calls immediately. No technical expertise required."
      },
      {
        question: "What happens if I exceed my plan's concurrent connection limit?",
        answer: "If you temporarily exceed your limit, calls will queue briefly. For consistent high volume, we'll automatically suggest an upgrade. You can also purchase additional connections on-demand through your dashboard."
      },
      {
        question: "Can I customize the AI's voice and personality?",
        answer: "Absolutely! All plans include voice customization, personality training, and brand-specific conversation flows. Growth and Agency plans offer advanced customization including industry-specific templates and custom integrations."
      },
      {
        question: "How does the 14-day free trial work?",
        answer: "Start with full access to Growth plan features for 14 days. No credit card required. Test unlimited calls, explore all features, and see real results before committing. Cancel anytime during the trial period."
      },
      {
        question: "What integrations are available?",
        answer: "We integrate with 100+ popular CRMs, calendars, and business tools including Salesforce, HubSpot, Calendly, Slack, and more. Agency plans include custom API access and white-label integration options."
      },
      {
        question: "Is my data secure and compliant?",
        answer: "Yes. We maintain SOC 2 Type II certification, GDPR compliance, and use bank-level encryption. All calls are processed securely, and we never store sensitive customer data without explicit permission."
      }
    ];

    const toggleFAQ = (index) => {
      setOpenFAQ(openFAQ === index ? null : index);
    };

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
        transition: { duration: 0.6, ease: "easeOut" }
      }
    };

    return (
      <section ref={sectionRef} className="py-24 bg-[#0C0A1D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-gray-300">Everything you need to know about CallEase</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden"
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
                  whileHover={{ backgroundColor: "rgba(0, 255, 255, 0.05)" }}
                >
                  <span className="text-lg font-semibold text-[#F0F0F0] pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={24} className="text-[#00FFFF]" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        className="p-6 pt-0 text-gray-300 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  };

  // Final CTA Section
  const FinalCTA = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
      <section ref={sectionRef} className="py-24 bg-gradient-to-br from-[#0C0A1D] via-[#1a1a2e] to-[#0C0A1D] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#E42289]/30 to-[#00FFFF]/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-5xl md:text-7xl font-bold text-[#F0F0F0] mb-8 leading-tight"
              animate={isInView ? {
                textShadow: [
                  "0 0 20px rgba(0, 255, 255, 0.3)",
                  "0 0 40px rgba(228, 34, 137, 0.5)",
                  "0 0 20px rgba(0, 255, 255, 0.3)"
                ]
              } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">
                Let's Build
              </span>{" "}
              Your Perfect Plan
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Ready to transform your business communications? Our team is here to help you choose the perfect plan and get started.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="relative px-12 py-6 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-2xl font-bold text-white text-xl transition-all duration-300 overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  <Calendar size={24} className="mr-3" />
                  Book a Demo
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-2xl blur opacity-0 group-hover:opacity-75"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                className="text-[#53caca] font-semibold text-lg hover:text-white transition-colors duration-300 flex items-center group"
                whileHover={{ scale: 1.05 }}
              >
                <MessageCircle size={20} className="mr-2 group-hover:animate-pulse " />
                Chat with an AI Specialist
                <motion.div
                  className="ml-2 bg-gradient-to-r from-[#E42289] to-[#00FFFF]"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: .5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-12 text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              <p>No pressure, no commitments. Just expert guidance to help you succeed.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-[#0C0A1D] overflow-x-hidden">
      <main>
        <HeroSection />
        <PricingTiers />
        <FeatureComparison />
        <CallEaseAdvantage />
        <FAQSection />
        <FinalCTA />
      </main>
    </div>
  );
};

export default Pricing;