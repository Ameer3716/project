// src/pages/BlogPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { 
  Search, Filter, ArrowRight, Brain, TrendingUp, Code, Globe, 
  ChevronLeft, ChevronRight, Linkedin, Twitter, Mail, Eye,
  Calendar, User, Tag, ExternalLink, Sparkles, Zap
} from 'lucide-react';

const BlogPage = () => {
  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentAuthorSlide, setCurrentAuthorSlide] = useState(0);

  // Animation controls
  const heroControls = useAnimation();
  const particleControls = useAnimation();

  // Sample data
  const categories = ['All', 'AI Research', 'Product Updates', 'Case Studies', 'Future of Work'];
  
  const blogPosts = [
    {
      id: 1,
      title: "Unlocking Hyper-Personalization with Voice Analytics",
      excerpt: "Dive deep into how CallEase leverages real-time analytics to create personalized conversation experiences that feel genuinely human.",
      category: "AI Research",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
      readTime: "8 min read",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "The ROI Revolution: How AI Calls Transform Business Metrics",
      excerpt: "Discover the measurable impact of AI-powered call automation on conversion rates, customer satisfaction, and operational efficiency.",
      category: "Case Studies",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
      readTime: "6 min read",
      date: "2024-01-12"
    },
    {
      id: 3,
      title: "Building Empathy into AI: The Next Frontier",
      excerpt: "Exploring how emotional intelligence and contextual understanding are reshaping the landscape of conversational AI technology.",
      category: "AI Research",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
      readTime: "10 min read",
      date: "2024-01-10"
    },
    {
      id: 4,
      title: "API 2.0 Release: Enhanced Developer Experience",
      excerpt: "Introducing our most powerful API yet, with improved documentation, better error handling, and lightning-fast response times.",
      category: "Product Updates",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
      readTime: "5 min read",
      date: "2024-01-08"
    },
    {
      id: 5,
      title: "Remote Work Revolution: AI as Your Virtual Assistant",
      excerpt: "How distributed teams are leveraging AI call automation to maintain seamless communication across time zones and cultures.",
      category: "Future of Work",
      image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
      readTime: "7 min read",
      date: "2024-01-05"
    },
    {
      id: 6,
      title: "Security First: Protecting Voice Data in the AI Era",
      excerpt: "An in-depth look at our enterprise-grade security measures and compliance standards for voice data protection.",
      category: "Product Updates",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
      readTime: "9 min read",
      date: "2024-01-03"
    }
  ];

  const authors = [
    {
      id: 1,
      name: "Dr. Aris Thorne",
      title: "Chief AI Researcher",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      linkedin: "#",
      twitter: "#",
      articles: 12
    },
    {
      id: 2,
      name: "Lena Petrova",
      title: "Lead Conversational Designer",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      linkedin: "#",
      twitter: "#",
      articles: 8
    },
    {
      id: 3,
      name: "Marcus Chen",
      title: "VP of Engineering",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      linkedin: "#",
      twitter: "#",
      articles: 15
    },
    {
      id: 4,
      name: "Sarah Kim",
      title: "Product Strategy Lead",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      linkedin: "#",
      twitter: "#",
      articles: 6
    }
  ];

  const categoryNodes = [
    { name: "AI Innovation", icon: Brain, color: "#E42289", posts: 24 },
    { name: "Customer Success", icon: TrendingUp, color: "#00FFFF", posts: 18 },
    { name: "API & Dev", icon: Code, color: "#E42289", posts: 12 },
    { name: "Future of Work", icon: Globe, color: "#00FFFF", posts: 15 }
  ];

  const popularPosts = [
    {
      number: "01",
      title: "The Definitive Guide to IVR vs. Conversational AI",
      description: "A foundational breakdown of the core technologies driving the voice revolution and where CallEase stands.",
      views: "12.5K"
    },
    {
      number: "02", 
      title: "Building Trust Through Transparent AI Conversations",
      description: "How ethical AI design principles create more meaningful and trustworthy customer interactions.",
      views: "9.8K"
    },
    {
      number: "03",
      title: "The Economics of AI: Cost Savings That Scale",
      description: "Real-world analysis of how AI call automation delivers measurable ROI across different business models.",
      views: "8.2K"
    }
  ];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Digital rain effect
  const DigitalRain = () => {
    const [drops, setDrops] = useState([]);

    useEffect(() => {
      const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const newDrops = [];
      
      for (let i = 0; i < 50; i++) {
        newDrops.push({
          id: i,
          char: characters[Math.floor(Math.random() * characters.length)],
          x: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 3 + Math.random() * 4
        });
      }
      setDrops(newDrops);
    }, []);

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {drops.map(drop => (
          <motion.div
            key={drop.id}
            className="absolute text-[#00FFFF] opacity-20 font-mono text-sm"
            style={{ left: `${drop.x}%` }}
            animate={{
              y: ['0vh', '100vh'],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: drop.duration,
              repeat: Infinity,
              delay: drop.delay,
              ease: 'linear'
            }}
          >
            {drop.char}
          </motion.div>
        ))}
      </div>
    );
  };

  // Particle burst effect
  const ParticleBurst = ({ controls }) => (
    <motion.div className="absolute top-1/2 left-1/2" animate={controls}>
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full"
          custom={i}
          variants={{
            initial: { x: 0, y: 0, opacity: 0, scale: 0 },
            burst: (i) => ({
              x: (Math.cos((i / 12) * 2 * Math.PI) * 60),
              y: (Math.sin((i / 12) * 2 * Math.PI) * 60),
              opacity: [1, 0],
              scale: [1, 0],
              transition: { duration: 0.8, ease: 'easeOut' }
            })
          }}
          initial="initial"
        />
      ))}
    </motion.div>
  );

  // Section 1: Hero Section - The Featured Signal
  const HeroSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
      <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0C0A1D] pt-20">
        {/* Background with digital static overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2)'
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#E42289]/20 via-transparent to-[#00FFFF]/20"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(228, 34, 137, 0.2), transparent, rgba(0, 255, 255, 0.2))",
                "linear-gradient(135deg, rgba(0, 255, 255, 0.2), transparent, rgba(228, 34, 137, 0.2))",
                "linear-gradient(45deg, rgba(228, 34, 137, 0.2), transparent, rgba(0, 255, 255, 0.2))"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Digital static effect */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-[#00FFFF]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <motion.span
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#E42289]/20 to-[#00FFFF]/20 rounded-full border border-white/10 text-sm text-gray-300 mb-8"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0, 255, 255, 0.3)",
                  "0 0 40px rgba(228, 34, 137, 0.5)",
                  "0 0 20px rgba(0, 255, 255, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles size={16} className="mr-2 text-[#00FFFF]" />
              FEATURED TRANSMISSION
            </motion.span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#F0F0F0] mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The Ethics of Emotion: Training AI for{" "}
            <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">
              Empathetic
            </span>{" "}
            Conversations
          </motion.h1>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              By Dr. Aris Thorne
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              Published 3 days ago
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Section 2: The Data Stream - Recent Articles
  const DataStreamSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 30, scale: 0.9 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" }
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
              The <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Data Stream</span>
            </h2>
            <p className="text-xl text-gray-300">Latest insights from the frontlines of AI innovation</p>
          </motion.div>

          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full lg:w-96">
                <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FFFF] transition-all duration-300"
                />
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-[#00FFFF] opacity-0 pointer-events-none"
                  animate={searchTerm ? { opacity: 0.3 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Articles Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="group bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:border-[#00FFFF]/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full text-xs font-semibold text-white">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#F0F0F0] mb-3 group-hover:text-[#00FFFF] transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    );
  };

  // Section 3: Category Nexus - Explore by Topic
  const CategoryNexusSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [hoveredNode, setHoveredNode] = useState(null);

    return (
      <section ref={sectionRef} className="py-24 bg-[#0C0A1D] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
              Navigate the <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Knowledge Matrix</span>
            </h2>
          </motion.div>

          <div className="relative h-96 flex items-center justify-center">
            {/* Central Hub */}
            <motion.div
              className="absolute w-32 h-32 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full flex items-center justify-center z-10"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(0, 255, 255, 0.3)",
                  "0 0 60px rgba(228, 34, 137, 0.5)",
                  "0 0 30px rgba(0, 255, 255, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-white font-bold text-lg">NEXUS</span>
            </motion.div>

            {/* Category Nodes */}
            {categoryNodes.map((node, index) => {
              const Icon = node.icon;
              const angle = (index / categoryNodes.length) * 2 * Math.PI;
              const radius = 180;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={node.name}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  onMouseEnter={() => setHoveredNode(index)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <motion.div
                    className="relative w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center cursor-pointer group"
                    animate={{
                      y: [0, -10, 0],
                      boxShadow: hoveredNode === index ? 
                        [`0 0 20px ${node.color}`, `0 0 40px ${node.color}`, `0 0 20px ${node.color}`] :
                        ["0 0 10px rgba(255, 255, 255, 0.1)", "0 0 20px rgba(255, 255, 255, 0.2)", "0 0 10px rgba(255, 255, 255, 0.1)"]
                    }}
                    transition={{
                      y: { duration: 3, repeat: Infinity, delay: index * 0.5 },
                      boxShadow: { duration: 2, repeat: Infinity }
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <Icon size={24} style={{ color: node.color }} />
                    
                    {/* Data line to center */}
                    {hoveredNode === index && (
                      <motion.div
                        className="absolute w-px bg-gradient-to-r from-transparent via-white to-transparent"
                        style={{
                          height: `${radius}px`,
                          left: '50%',
                          top: '50%',
                          transformOrigin: 'top center',
                          transform: `rotate(${angle + Math.PI}rad) translateY(-50%)`
                        }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>

                  {/* Node label */}
                  <AnimatePresence>
                    {hoveredNode === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center"
                      >
                        <div className="text-white font-semibold text-sm whitespace-nowrap">{node.name}</div>
                        <div className="text-gray-400 text-xs">{node.posts} articles</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  // Section 4: The Voices - Meet Our Authors
  const VoicesSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const nextSlide = () => {
      setCurrentAuthorSlide((prev) => (prev + 1) % authors.length);
    };

    const prevSlide = () => {
      setCurrentAuthorSlide((prev) => (prev - 1 + authors.length) % authors.length);
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
              The <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Voices</span>
            </h2>
            <p className="text-xl text-gray-300">Meet the experts behind our insights</p>
          </motion.div>

          <div className="relative">
            {/* Navigation Arrows */}
            <motion.button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-[#E42289]/20 transition-all duration-300"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} className="text-[#F0F0F0]" />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-[#E42289]/20 transition-all duration-300"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} className="text-[#F0F0F0]" />
            </motion.button>

            {/* Authors Carousel */}
            <div className="overflow-hidden mx-16">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentAuthorSlide * (100 / 3)}%)` }}
              >
                {authors.map((author, index) => {
                  const isCenter = index === currentAuthorSlide;
                  return (
                    <div key={author.id} className="w-1/3 flex-shrink-0 px-4">
                      <motion.div
                        className={`bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center transition-all duration-300 ${
                          isCenter ? 'scale-110 border-[#00FFFF]/50' : 'scale-100'
                        }`}
                        whileHover={{ y: -5 }}
                      >
                        <div className="relative mb-6">
                          <motion.img
                            src={author.image}
                            alt={author.name}
                            className="w-24 h-24 rounded-full mx-auto border-2 border-[#00FFFF]/30"
                            animate={isCenter ? {
                              boxShadow: [
                                "0 0 20px rgba(0, 255, 255, 0.3)",
                                "0 0 40px rgba(228, 34, 137, 0.5)",
                                "0 0 20px rgba(0, 255, 255, 0.3)"
                              ]
                            } : {}}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                          {/* Scanline effect */}
                          <motion.div
                            className="absolute inset-0 w-24 h-24 rounded-full mx-auto border border-[#00FFFF] opacity-30"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 0.7, 0.3]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>

                        <h3 className="text-xl font-bold text-[#F0F0F0] mb-2">{author.name}</h3>
                        <p className="text-[#00FFFF] font-medium mb-2">{author.title}</p>
                        <p className="text-gray-400 text-sm mb-4">{author.articles} articles published</p>

                        {/* Social Icons - appear on hover */}
                        <motion.div
                          className="flex justify-center space-x-4"
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.a
                            href={author.linkedin}
                            className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-300"
                            whileHover={{ scale: 1.2 }}
                          >
                            <Linkedin size={20} />
                          </motion.a>
                          <motion.a
                            href={author.twitter}
                            className="text-gray-400 hover:text-[#E42289] transition-colors duration-300"
                            whileHover={{ scale: 1.2 }}
                          >
                            <Twitter size={20} />
                          </motion.a>
                        </motion.div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {authors.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentAuthorSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentAuthorSlide ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] w-8' : 'bg-white/20 w-2 hover:bg-white/40'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Section 5: The Knowledge Core - Popular & Foundational Posts
  const KnowledgeCoreSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const particleControlsArray = [useAnimation(), useAnimation(), useAnimation()];

    useEffect(() => {
      if (isInView) {
        particleControlsArray.forEach((controls, index) => {
          const interval = setInterval(() => {
            controls.start('burst');
          }, 3000 + index * 1000);
          
          return () => clearInterval(interval);
        });
      }
    }, [isInView]);

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.2 }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
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
              The <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">Knowledge Core</span>
            </h2>
            <p className="text-xl text-gray-300">Foundational insights that define our expertise</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {popularPosts.map((post, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 text-center group hover:border-[#00FFFF]/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        bottom: '10%'
                      }}
                      animate={{
                        y: [0, -100, -200],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>

                <motion.div
                  className="text-6xl font-bold bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent mb-6"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {post.number}
                </motion.div>

                <h3 className="text-xl font-bold text-[#F0F0F0] mb-4 group-hover:text-[#00FFFF] transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {post.description}
                </p>

                <div className="flex items-center justify-center text-gray-400 text-sm">
                  <Eye size={16} className="mr-2" />
                  {post.views} views
                </div>

                {/* Particle burst effect */}
                <ParticleBurst controls={particleControlsArray[index]} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  };

  // Section 6: Join the Stream - Newsletter Subscription
  const JoinStreamSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e) => {
      e.preventDefault();
      if (email) {
        setIsSubscribed(true);
        setTimeout(() => {
          setIsSubscribed(false);
          setEmail('');
        }, 3000);
      }
    };

    return (
      <section ref={sectionRef} className="py-24 bg-gradient-to-br from-[#0C0A1D] via-[#1a1a2e] to-[#0C0A1D] relative overflow-hidden">
        {/* Digital Rain Background */}
        <DigitalRain />

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
              Decode the Future.{" "}
              <span className="bg-gradient-to-r from-[#E42289] to-[#00FFFF] bg-clip-text text-transparent">
                Subscribe
              </span>{" "}
              to the Signal.
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Get mission-critical insights, research, and product updates delivered directly to your inbox. No spam, only signal.
            </motion.p>

            <motion.form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <div className="relative flex-1 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00FFFF] transition-all duration-300"
                  required
                />
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-[#00FFFF] opacity-0 pointer-events-none"
                  animate={email ? { opacity: 0.3 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <motion.button
                type="submit"
                className="relative px-8 py-4 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg font-bold text-white transition-all duration-300 overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0, 255, 255, 0.3)",
                    "0 0 40px rgba(228, 34, 137, 0.5)",
                    "0 0 20px rgba(0, 255, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative z-10 flex items-center">
                  {isSubscribed ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mr-2"
                      >
                        ✓
                      </motion.div>
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <Mail size={20} className="ml-2" />
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg blur opacity-0 group-hover:opacity-75"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.form>

            <motion.div
              className="mt-8 text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              <p>Join 10,000+ AI enthusiasts and industry leaders</p>
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
        <DataStreamSection />
        <CategoryNexusSection />
        <VoicesSection />
        <KnowledgeCoreSection />
        <JoinStreamSection />
      </main>
    </div>
  );
};

export default BlogPage;