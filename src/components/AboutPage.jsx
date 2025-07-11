import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { 
  Lightbulb, Shield, Network, Cpu, CheckCircle, Users, Calendar, 
  Github, Linkedin, Twitter, ArrowRight, Sparkles, Zap, Star,
  Brain, Code, Rocket, Target, Heart, Award, Globe, TrendingUp
} from 'lucide-react';

const AboutPage = () => {
  // Section 1: Hero Section - The Genesis
  const GenesisSection = () => {
    const [sparkExpanded, setSparkExpanded] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    const words = ["Forged", "in", "the", "Future", "of", "Communication."];
    
    useEffect(() => {
      if (isInView) {
        const timer = setTimeout(() => setSparkExpanded(true), 1000);
        return () => clearTimeout(timer);
      }
    }, [isInView]);

    useEffect(() => {
      if (isInView) {
        const interval = setInterval(() => {
          setTextIndex(prev => (prev + 1) % words.length);
        }, 800);
        return () => clearInterval(interval);
      }
    }, [isInView]);

    // Network animation nodes
    const networkNodes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
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

          {/* The Spark Animation */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className="w-4 h-4 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full"
              animate={sparkExpanded ? { scale: [1, 20, 1] } : { scale: [1, 1.2, 1] }}
              transition={sparkExpanded ? { duration: 2, ease: "easeOut" } : { duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Network Formation */}
          <AnimatePresence>
            {sparkExpanded && (
              <motion.div className="absolute inset-0">
                {networkNodes.map((node, index) => (
                  <motion.div
                    key={node.id}
                    className="absolute w-2 h-2 bg-[#00FFFF] rounded-full"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    transition={{ delay: node.delay, duration: 0.5 }}
                  >
                    {/* Connection lines */}
                    {networkNodes.slice(index + 1, index + 3).map((targetNode, lineIndex) => (
                      <motion.div
                        key={lineIndex}
                        className="absolute w-px bg-gradient-to-r from-[#E42289] to-[#00FFFF] origin-left"
                        style={{
                          height: `${Math.sqrt(Math.pow(targetNode.x - node.x, 2) + Math.pow(targetNode.y - node.y, 2))}px`,
                          transform: `rotate(${Math.atan2(targetNode.y - node.y, targetNode.x - node.x) * 180 / Math.PI}deg)`
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 0.6 }}
                        transition={{ delay: node.delay + 0.5, duration: 1 }}
                      />
                    ))}
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
            <motion.h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  className={`inline-block mr-4 ${
                    word === "Future" 
                      ? "bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent"
                      : "text-[#F0F0F0]"
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={textIndex >= index ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 3 }}
            >
              CallEase wasn't just built; it was sparked. Born from the challenge of a million missed connections, 
              we set out to redefine the boundary between human conversation and artificial intelligence.
            </motion.p>
          </motion.div>
        </div>
      </section>
    );
  };

  // Section 2: The Core Directive
  const CoreDirectiveSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
              The <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Core Directive</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00FFFF]/20 to-transparent rounded-2xl blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full">
                <motion.div
                  className="w-full h-1 bg-[#00FFFF] rounded-full mb-6"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <h3 className="text-3xl font-bold text-[#F0F0F0] mb-6">Our Mission</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  To empower every business with intelligent, seamless, and deeply human-like voice communication, 
                  turning every call into an opportunity.
                </p>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#E42289]/20 to-transparent rounded-2xl blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full">
                <motion.div
                  className="w-full h-1 bg-[#E42289] rounded-full mb-6"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1, delay: 0.7 }}
                />
                <h3 className="text-3xl font-bold text-[#F0F0F0] mb-6">Our Vision</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  A world where technology eliminates communication barriers, fostering growth and understanding 
                  on a global scale through accessible AI.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Data Flow Animation */}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="w-64 h-1 bg-gradient-to-r from-[#00FFFF] via-[#E42289] to-[#00FFFF] rounded-full"
              animate={{
                background: [
                  "linear-gradient(to right, #00FFFF, #E42289, #00FFFF)",
                  "linear-gradient(to right, #E42289, #00FFFF, #E42289)",
                  "linear-gradient(to right, #00FFFF, #E42289, #00FFFF)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </section>
    );
  };

  // Section 3: The Architects of AI
  const ArchitectsSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const teamMembers = [
      {
        name: "Jaelon Smith",
        title: "Chief AI Architect",
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
        linkedin: "#",
        github: "#"
      },
      {
        name: "Sarah Chen",
        title: "VP of Engineering",
        image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
        linkedin: "#",
        github: "#"
      },
      {
        name: "Marcus Johnson",
        title: "Head of Product",
        image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
        linkedin: "#",
        github: "#"
      },
      {
        name: "Elena Rodriguez",
        title: "Chief Technology Officer",
        image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
        linkedin: "#",
        github: "#"
      }
    ];

    return (
      <section ref={sectionRef} className="py-24 bg-[#0C0A1D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[#F0F0F0] mb-4">
              The <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Architects</span> of AI
            </h2>
            <p className="text-xl text-gray-300">Meet the visionaries building the future of communication</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  boxShadow: "0 25px 50px rgba(0, 255, 255, 0.3)"
                }}
                className="group perspective-1000"
              >
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform-gpu transition-all duration-300">
                  {/* Holographic overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-[#00FFFF]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Scanline effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FFFF]/30 to-transparent h-full w-full rounded-2xl opacity-0 group-hover:opacity-100"
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="relative z-10">
                    <div className="relative mb-6">
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto border-2 border-[#00FFFF]/30"
                        whileHover={{ scale: 1.1 }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[#00FFFF] opacity-0 group-hover:opacity-100"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </div>

                    <h3 className="text-xl font-bold text-[#F0F0F0] mb-2">{member.name}</h3>
                    <p className="text-[#00FFFF] text-sm mb-4">{member.title}</p>

                    {/* Social Icons */}
                    <motion.div
                      className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.a
                        href={member.linkedin}
                        whileHover={{ scale: 1.2, color: "#00FFFF" }}
                        className="text-gray-400 hover:text-[#00FFFF] transition-colors"
                      >
                        <Linkedin size={20} />
                      </motion.a>
                      <motion.a
                        href={member.github}
                        whileHover={{ scale: 1.2, color: "#E42289" }}
                        className="text-gray-400 hover:text-[#E42289] transition-colors"
                      >
                        <Github size={20} />
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Section 4: Our Journey Through Time
  const JourneySection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [hoveredNode, setHoveredNode] = useState(null);

    const milestones = [
      {
        year: "2021",
        title: "The Spark",
        description: "Initial concept and algorithm development.",
        icon: Lightbulb
      },
      {
        year: "2022",
        title: "First Contact",
        description: "Alpha version launched with our first 10 pilot partners.",
        icon: Rocket
      },
      {
        year: "2023",
        title: "Growth Singularity",
        description: "Secured Series A funding and expanded the core team.",
        icon: TrendingUp
      },
      {
        year: "Today",
        title: "The Nexus",
        description: "Serving over 1,000 clients and powering millions of conversations.",
        icon: Globe
      }
    ];

    return (
      <section ref={sectionRef} className="py-24 bg-gradient-to-br from-[#0C0A1D] to-[#1a1a2e] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[#F0F0F0] mb-4">
              Our Journey <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Through Time</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 transform -translate-y-1/2"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#E42289] to-[#00FFFF] transform -translate-y-1/2"
              initial={{ width: "0%" }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Timeline Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.3 }}
                    className="relative text-center"
                    onMouseEnter={() => setHoveredNode(index)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Node */}
                    <motion.div
                      className="relative z-10 w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full flex items-center justify-center"
                      animate={hoveredNode === index ? {
                        scale: 1.2,
                        boxShadow: [
                          "0 0 20px rgba(0, 255, 255, 0.5)",
                          "0 0 40px rgba(228, 34, 137, 0.7)",
                          "0 0 20px rgba(0, 255, 255, 0.5)"
                        ]
                      } : {
                        boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)"
                      }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon size={32} className="text-white" />
                      
                      {/* Pulse effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[#00FFFF]"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                      animate={hoveredNode === index ? { scale: 1.05, y: -10 } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-[#00FFFF] mb-2">{milestone.year}</h3>
                      <h4 className="text-xl font-semibold text-[#F0F0F0] mb-3">{milestone.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{milestone.description}</p>
                    </motion.div>

                    {/* Expanded Description */}
                    <AnimatePresence>
                      {hoveredNode === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 20, scale: 0.8 }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 backdrop-blur-sm rounded-lg p-4 border border-white/30 z-20"
                        >
                          <div className="w-3 h-3 bg-[#00FFFF] rounded-full mx-auto animate-pulse" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Section 5: The Pillars of Our Code
  const PillarsSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const pillars = [
      {
        icon: Brain,
        title: "Innovation",
        description: "We are relentless in our pursuit of the next-generation of AI, pushing the boundaries of what's possible in voice technology."
      },
      {
        icon: Shield,
        title: "Integrity",
        description: "Trust is our most important asset. We build with an unwavering commitment to data security, transparency, and ethical AI."
      },
      {
        icon: Network,
        title: "Scalability",
        description: "Our architecture is designed for infinite growth, ensuring CallEase evolves and scales seamlessly with your ambitions."
      }
    ];

    // Digital construction effect for icons
    const DigitalConstruction = ({ children, delay = 0 }) => {
      const [pixels, setPixels] = useState([]);
      
      useEffect(() => {
        if (isInView) {
          const pixelArray = Array.from({ length: 64 }, (_, i) => ({
            id: i,
            x: (i % 8) * 4,
            y: Math.floor(i / 8) * 4,
            delay: Math.random() * 0.5 + delay
          }));
          setPixels(pixelArray);
        }
      }, [isInView, delay]);

      return (
        <div className="relative w-16 h-16">
          {/* Pixel assembly effect */}
          <div className="absolute inset-0">
            {pixels.map((pixel) => (
              <motion.div
                key={pixel.id}
                className="absolute w-1 h-1 bg-gradient-to-r from-[#E42289] to-[#00FFFF]"
                style={{ left: pixel.x, top: pixel.y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: pixel.delay, duration: 0.3 }}
              />
            ))}
          </div>
          
          {/* Final icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.8 }}
          >
            {children}
          </motion.div>
        </div>
      );
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
            <h2 className="text-4xl md:text-6xl font-bold text-[#F0F0F0] mb-4">
              The Pillars of <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Our Code</span>
            </h2>
            <p className="text-xl text-gray-300">The foundational principles that drive everything we build</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                  className="text-center group"
                >
                  <motion.div
                  className="relative"
                  animate={
                    isInView
                      ? {
                          rotateY: 3600,
                          transition: {
                            delay: .5 + index * 0.3, // Starts after initial animations
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          
                          }
                        }
                      : {}
                  }
                >

                  <motion.div
                    className="relative mx-auto mb-8"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div
                      className="w-24 h-24 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-sm mx-auto"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(0, 255, 255, 0.3)",
                          "0 0 40px rgba(228, 34, 137, 0.5)",
                          "0 0 20px rgba(0, 255, 255, 0.3)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <DigitalConstruction delay={index * 0.5}>
                        <Icon size={32} className="text-[#00FFFF]" />
                      </DigitalConstruction>
                    </motion.div>
                  </motion.div>
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-bold text-[#F0F0F0] mb-4 group-hover:text-[#00FFFF] transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.3 + 1 }}
                  >
                    {pillar.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-300 leading-relaxed max-w-sm mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.3 + 1.2 }}
                  >
                    {pillar.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  // Section 6: Become Part of the Future
  const FutureSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
      <section ref={sectionRef} className="py-24 bg-gradient-to-br from-[#0C0A1D] via-[#1a1a2e] to-[#0C0A1D] relative overflow-hidden">
        {/* Heartbeat Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
            animate={{
              background: [
                "radial-gradient(circle, rgba(228,34,137,0.3) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(228,34,137,0.3) 0%, transparent 70%)"
              ],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">
                Our Team
              </span>{" "}
              is Our Greatest Algorithm.{" "}
              <span className="bg-gradient-to-r from-[#00FFFF] to-[#E42289] bg-clip-text text-transparent">
                Join Us.
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              We're looking for the brilliant, the passionate, and the innovators to help us build the future of communication. 
              See where you fit in.
            </motion.p>

            <motion.button
              className="relative px-12 py-6 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-2xl font-bold text-white text-xl transition-all duration-300 overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <span className="relative z-10 flex items-center">
                <Users size={24} className="mr-3" />
                View Open Roles
                <motion.div
                  className="ml-3"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={24} />
                </motion.div>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-2xl blur opacity-0 group-hover:opacity-75"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.div
              className="mt-12 text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              <p>Join a team that's redefining the future of human-AI interaction</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  };

  return (
    <>
      <div className="about-us-page-container">
        <GenesisSection />
        <CoreDirectiveSection />
        <ArchitectsSection />
        <JourneySection />
        <PillarsSection />
        <FutureSection />
      </div>
    </>
  );
};

export default AboutPage;