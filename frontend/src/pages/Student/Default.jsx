import { useEffect, useRef } from 'react';
import '../../styles/Student/Default.css';

const Default = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const featureCardsRef = useRef([]);
  const statsRef = useRef(null);
  const processRef = useRef(null);
  const testimonialsRef = useRef(null);
  const companiesRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate stats counting
            if (entry.target.classList.contains('stats-section')) {
              const statNumbers = document.querySelectorAll('.stat-number');
              statNumbers.forEach((stat) => {
                const target = +stat.getAttribute('data-count');
                const duration = 2000;
                const start = 0;
                const increment = target / (duration / 16);
                let current = start;
                
                const timer = setInterval(() => {
                  current += increment;
                  if (current >= target) {
                    clearInterval(timer);
                    current = target;
                  }
                  stat.textContent = Math.floor(current);
                }, 16);
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    if (processRef.current) observer.observe(processRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (companiesRef.current) observer.observe(companiesRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  // Feature icons - using simpler, more reliable SVG paths
  const featureIcons = [
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z",
    "M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm8-3h2v10h-2zm-4 6h2v4h-2z",
    "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z",
    "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z",
    "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 10h9v2H5zm0-3h9v2H5z",
    "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1.5-1L8 9V4zm9 16H6V4h1v9l3-3 3 3V4h5v16z"
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section ref={heroRef} className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Transform Your</span>
            <span className="title-line highlight">Placement Journey</span>
          </h1>
          <p className="hero-subtitle">
            Streamlining the placement process for students, recruiters, and administrators with our automated platform.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-outline">Learn More</button>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="floating-elements">
            <div className="floating-circle circle-1"></div>
            <div className="floating-circle circle-2"></div>
            <div className="floating-circle circle-3"></div>
            <div className="floating-square"></div>
            <div className="dashboard-mockup"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <h3 className="stat-number" data-count="150">0</h3>
            <p className="stat-label">Top Companies</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number" data-count="1200">0</h3>
            <p className="stat-label">Students Placed</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number" data-count="96">0</h3>
            <p className="stat-label">% Placement Rate</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number" data-count="500">0</h3>
            <p className="stat-label">Job Offers</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="features-section">
        <h2 className="section-title-df">Key Features</h2>
        <p className="section-subtitle">Everything you need for a seamless placement experience</p>
        
        <div className="features-grid-df">
          {[
            {
              title: 'Automated Notifications',
              description: 'Get instant alerts about new job postings, interview schedules, and important announcements.'
            },
            {
              title: 'Analytics Dashboard',
              description: 'Track placement statistics, student performance, and company engagement metrics in real-time.'
            },
            {
              title: 'Resume Builder',
              description: 'Create professional resumes with our easy-to-use templates tailored for different job profiles.'
            },
            {
              title: 'Interview Scheduler',
              description: 'Coordinate interviews between companies and students with our integrated scheduling system.'
            },
            {
              title: 'Skill Assessment',
              description: 'Evaluate your skills with our comprehensive tests and get personalized improvement suggestions.'
            },
            {
              title: 'Company Portal',
              description: 'Dedicated space for recruiters to post jobs, review applications, and manage campus drives.'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              ref={(el) => (featureCardsRef.current[index] = el)} 
              className="feature-card-df"
            >
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d={featureIcons[index]} />
                </svg>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Placement Process Section */}
      <section ref={processRef} className="process-section">
        <h2 className="section-title-df">Our Placement Process</h2>
        <p className="section-subtitle">Simple steps to your dream job</p>
        
        <div className="process-steps">
          {[
            { number: '1', title: 'Profile Creation', description: 'Complete your profile with academic and skill details' },
            { number: '2', title: 'Resume Building', description: 'Create a professional resume using our templates' },
            { number: '3', title: 'Skill Assessment', description: 'Take our tests to evaluate your competencies' },
            { number: '4', title: 'Job Matching', description: 'Get matched with suitable companies based on your profile' },
            { number: '5', title: 'Interview Preparation', description: 'Access resources to prepare for interviews' },
            { number: '6', title: 'Placement', description: 'Attend interviews and secure your dream job' }
          ].map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="testimonials-section">
        <h2 className="section-title-df">Success Stories</h2>
        <p className="section-subtitle">Hear from our students and recruiters</p>
        
        <div className="testimonials-grid">
          {[
            {
              text: "The placement portal made it so easy to apply to multiple companies and track my applications. I landed my dream job within weeks!",
              name: "Rahul Sharma",
              role: "Placed at Microsoft"
            },
            {
              text: "As a recruiter, this platform has streamlined our campus hiring process significantly. The student profiles are comprehensive and easy to evaluate.",
              name: "Priya Patel",
              role: "HR Manager, Amazon"
            },
            {
              text: "The resume builder helped me create a professional CV that got me noticed by top companies. I received 5 interview calls within a week!",
              name: "Anjali Mehta",
              role: "Placed at Google"
            }
          ].map((testimonial, index) => (
            <div 
              key={index}
              className="testimonial-card"
            >
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Default;