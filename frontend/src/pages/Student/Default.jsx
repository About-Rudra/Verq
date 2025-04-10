import React, { useEffect, useRef, useState } from 'react';
import '../../styles/student/Default.css';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';

const Default = () => {
  const controls = useAnimation();
  const statsControls = useAnimation();
  const ref = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const [activeTab, setActiveTab] = useState('roadmap');
  const [highlightedStep, setHighlightedStep] = useState(null);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  useEffect(() => {
    if (statsInView) {
      statsControls.start("visible");
    }
  }, [statsControls, statsInView]);

  const pathVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 100 }
    }
  };

  const counterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const iconVariants = {
    hover: { 
      scale: 1.15,
      rotate: 8,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  const testimonials = [
    {
      name: "Priya Sharma",
      company: "Microsoft",
      text: "This roadmap was crucial for my Microsoft interview preparation. The structured approach helped me ace the DSA round!",
      avatar: "PS"
    },
    {
      name: "Rahul Patel",
      company: "Amazon",
      text: "Clear guidance and focused resources made all the difference. I couldn't have secured my Amazon offer without this platform.",
      avatar: "RP"
    },
    {
      name: "Anjali Verma",
      company: "Google",
      text: "The interactive exercises and personalized feedback were exactly what I needed to build my confidence for the Google interviews.",
      avatar: "AV"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const placementStats = [
    { label: "Placements", value: "500+", color: "#4f46e5" },
    { label: "Avg. Package", value: "₹12L", color: "#0ea5e9" },
    { label: "Top Companies", value: "50+", color: "#10b981" },
    { label: "Success Rate", value: "92%", color: "#f43f5e" }
  ];

  return (
    <div className="default-container">
      <div className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">Your CS Career Compass</h1>
          <p className="hero-subtitle">Navigate your way to dream tech placements with our structured roadmaps</p>
          
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button 
              className="primary-btn"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(79, 70, 229, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey <span className="ml-2">→</span>
            </motion.button>
            <motion.button 
              className="secondary-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>
        
        <div className="hero-graphic">
          <motion.div 
            className="floating-badge top-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="badge-icon">
              <TrophyIcon />
            </div>
            <div className="badge-text">
              <span className="badge-highlight">92%</span> placement success
            </div>
          </motion.div>
          
          <motion.div 
            className="floating-badge right-badge"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <div className="badge-icon">
              <BriefcaseIcon />
            </div>
            <div className="badge-text">
              <span className="badge-highlight">500+</span> offers
            </div>
          </motion.div>
          
          <motion.div 
            className="floating-badge bottom-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <div className="badge-icon">
              <BuildingIcon />
            </div>
            <div className="badge-text">
              <span className="badge-highlight">50+</span> top companies
            </div>
          </motion.div>
        </div>
      </div>

      <div className="tab-section">
        <div className="tab-buttons">
          <motion.button 
            className={`tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
          >
            Your Roadmap
          </motion.button>
          <motion.button 
            className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
          >
            Placement Stats
          </motion.button>
          <motion.button 
            className={`tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
            onClick={() => setActiveTab('testimonials')}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
          >
            Success Stories
          </motion.button>
        </div>
        
        <div className="tab-content">
          <AnimatePresence mode="wait">
            {activeTab === 'roadmap' && (
              <motion.div 
                key="roadmap"
                className="roadmap-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="roadmap-wrapper"
                  ref={ref}
                  initial="hidden"
                  animate={controls}
                  variants={pathVariants}
                >
                  {/* Step 1 */}
                  <motion.div 
                    className={`roadmap-step ${highlightedStep === 0 ? 'highlighted' : ''}`}
                    variants={stepVariants}
                    onMouseEnter={() => setHighlightedStep(0)}
                    onMouseLeave={() => setHighlightedStep(null)}
                  >
                    <div className="step-number">1</div>
                    <motion.div 
                      className="step-icon"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <CodeIcon />
                    </motion.div>
                    <div className="step-content">
                      <h3>Foundations</h3>
                      <p>Master core CS concepts & programming languages</p>
                      <div className="step-details">
                        <div className="step-tag">Python</div>
                        <div className="step-tag">Java</div>
                        <div className="step-tag">OOPS</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div className="roadmap-connector" variants={stepVariants}>
                    <ArrowIcon />
                  </motion.div>
                  
                  {/* Step 2 */}
                  <motion.div 
                    className={`roadmap-step ${highlightedStep === 1 ? 'highlighted' : ''}`}
                    variants={stepVariants}
                    onMouseEnter={() => setHighlightedStep(1)}
                    onMouseLeave={() => setHighlightedStep(null)}
                  >
                    <div className="step-number">2</div>
                    <motion.div 
                      className="step-icon"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <ProjectIcon />
                    </motion.div>
                    <div className="step-content">
                      <h3>Development</h3>
                      <p>Build impressive projects & practical skills</p>
                      <div className="step-details">
                        <div className="step-tag">Web Dev</div>
                        <div className="step-tag">Backend</div>
                        <div className="step-tag">ML</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div className="roadmap-connector" variants={stepVariants}>
                    <ArrowIcon />
                  </motion.div>
                  
                  {/* Step 3 */}
                  <motion.div 
                    className={`roadmap-step ${highlightedStep === 2 ? 'highlighted' : ''}`}
                    variants={stepVariants}
                    onMouseEnter={() => setHighlightedStep(2)}
                    onMouseLeave={() => setHighlightedStep(null)}
                  >
                    <div className="step-number">3</div>
                    <motion.div 
                      className="step-icon"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <AlgorithmIcon />
                    </motion.div>
                    <div className="step-content">
                      <h3>DSA Mastery</h3>
                      <p>Strengthen problem solving & algorithm skills</p>
                      <div className="step-details">
                        <div className="step-tag">Algorithms</div>
                        <div className="step-tag">Data Structures</div>
                        <div className="step-tag">Patterns</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div className="roadmap-connector" variants={stepVariants}>
                    <ArrowIcon />
                  </motion.div>
                  
                  {/* Step 4 */}
                  <motion.div 
                    className={`roadmap-step ${highlightedStep === 3 ? 'highlighted' : ''}`} 
                    variants={stepVariants}
                    onMouseEnter={() => setHighlightedStep(3)}
                    onMouseLeave={() => setHighlightedStep(null)}
                  >
                    <div className="step-number">4</div>
                    <motion.div 
                      className="step-icon"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <TrophyIcon />
                    </motion.div>
                    <div className="step-content">
                      <h3>Placement</h3>
                      <p>Ace interviews & land dream offers</p>
                      <div className="step-details">
                        <div className="step-tag">Mock Interviews</div>
                        <div className="step-tag">Resume</div>
                        <div className="step-tag">Offers</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
                
                <motion.div
                  className="roadmap-action"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.button 
                    className="primary-btn"
                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(79, 70, 229, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Detailed Roadmap
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
            
            {activeTab === 'stats' && (
              <motion.div 
                key="stats"
                className="stats-content"
                ref={statsRef}
                initial="hidden"
                animate={statsControls}
                variants={pathVariants}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="stats-wrapper">
                  {placementStats.map((stat, index) => (
                    <motion.div 
                      key={index} 
                      className="stat-card"
                      variants={counterVariants}
                      style={{ 
                        backgroundColor: `${stat.color}10`,
                        borderColor: stat.color
                      }}
                    >
                      <div className="stat-value" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                      <div className="stat-label">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="company-logos">
                  <h3>Our Students Work At</h3>
                  <div className="logo-cloud">
                    {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Uber', 'Swiggy', 'Paytm'].map((company, index) => (
                      <motion.div 
                        key={index}
                        className="logo-item"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        {company}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'testimonials' && (
              <motion.div 
                key="testimonials"
                className="testimonials-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentTestimonial}
                    className="testimonial-card"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="testimonial-header">
                      <div className="testimonial-avatar">
                        {testimonials[currentTestimonial].avatar}
                      </div>
                      <div className="testimonial-author">
                        <div className="testimonial-name">
                          {testimonials[currentTestimonial].name}
                        </div>
                        <div className="testimonial-company">
                          @ {testimonials[currentTestimonial].company}
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-text">
                      "{testimonials[currentTestimonial].text}"
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                <div className="testimonial-dots">
                  {testimonials.map((_, index) => (
                    <span 
                      key={index} 
                      className={`testimonial-dot ${index === currentTestimonial ? 'active' : ''}`}
                      onClick={() => setCurrentTestimonial(index)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Floating tech icons in background */}
      <div className="floating-tech-icons">
        {['</>', '{}', '()', '[]', ';', '=>', 'AI', 'SQL', 'JS', 'Py', 'C++', 'DB'].map((icon, i) => (
          <motion.div
            key={i}
            className="tech-icon"
            initial={{ y: 0, x: Math.random() * 100 }}
            animate={{
              y: [0, -1000],
              x: [0, Math.random() * 300 - 150],
              opacity: [0.2, 0],
              rotate: [0, Math.random() * 360]
            }}
            transition={{
              duration: 15 + Math.random() * 25,
              repeat: Infinity,
              delay: Math.random() * 15
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// SVG Icons as React components
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const ProjectIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3h18v18H3zM9 3v18M3 9h18"></path>
  </svg>
);

const AlgorithmIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v6M12 18v4"></path>
    <rect x="4" y="8" width="16" height="10" rx="2"></rect>
    <path d="M8 12h8"></path>
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 22v-4"></path>
    <path d="M14 22v-4"></path>
    <path d="M8 6h8v4a4 4 0 0 1-8 0V6Z"></path>
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"></path>
  </svg>
);

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
  </svg>
);

export default Default;