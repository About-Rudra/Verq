import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, BookOpen, Code, Server, Database, Globe, Lock, Moon, Sun } from 'lucide-react';
import '../../styles/Student/FAQ.css';

const FAQ = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  
  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  // Company questions data (same as before)
  const questions = [
    // Frontend Domain
    { 
      id: 1, 
      domain: 'frontend', 
      company: 'Google',
      difficulty: 'hard', 
      question: 'Implement a debounce function in JavaScript', 
      description: 'Create a debounce utility that limits the frequency of function executions, particularly useful for handling events like window resize or search input.',
      hint: 'Use setTimeout and clearTimeout to manage the timing of function calls.'
    },
    { 
      id: 2, 
      domain: 'frontend', 
      company: 'Meta',
      difficulty: 'medium', 
      question: 'Create a custom React hook for form validation', 
      description: 'Design a reusable hook that manages form state and validation logic for React applications.',
      hint: 'Consider using useState for form values and errors, along with validation functions that return appropriate error messages.'
    },
    { 
      id: 3, 
      domain: 'frontend', 
      company: 'Amazon',
      difficulty: 'medium', 
      question: 'Implement a virtual scroll component', 
      description: 'Build a component that efficiently renders large lists by only showing elements currently in the viewport.',
      hint: 'Track scroll position and calculate which items should be rendered based on container height and item dimensions.'
    },
    { 
      id: 4, 
      domain: 'frontend', 
      company: 'Netflix',
      difficulty: 'hard', 
      question: 'Create a responsive image carousel with lazy loading', 
      description: 'Develop a carousel that loads images only when needed and functions smoothly across all device sizes.',
      hint: 'Use IntersectionObserver for lazy loading and consider using CSS Grid or Flexbox for responsive layouts.'
    },
    { 
      id: 5, 
      domain: 'frontend', 
      company: 'Apple',
      difficulty: 'medium', 
      question: 'Implement a drag and drop interface', 
      description: 'Create a UI that allows users to drag elements and drop them in designated areas, with visual feedback.',
      hint: 'Leverage the HTML5 Drag and Drop API, managing dragstart, dragover, and drop events.'
    },
    { 
      id: 6, 
      domain: 'frontend', 
      company: 'Microsoft',
      difficulty: 'easy', 
      question: 'Build a theme switcher with CSS variables', 
      description: 'Create a component that allows users to toggle between light and dark themes using CSS custom properties.',
      hint: 'Define color schemes using CSS variables and toggle them by changing a data attribute on a parent element.'
    },
    { 
      id: 7, 
      domain: 'frontend', 
      company: 'Airbnb',
      difficulty: 'medium', 
      question: 'Implement a date range picker component', 
      description: 'Create a component that allows users to select a start and end date with appropriate validation and UI feedback.',
      hint: 'Consider edge cases like preventing end dates before start dates and providing visual calendar representation.'
    },
    { 
      id: 8, 
      domain: 'frontend', 
      company: 'Uber',
      difficulty: 'hard', 
      question: 'Build a state management solution from scratch', 
      description: 'Create a simple but effective state management library similar to Redux or MobX for React applications.',
      hint: 'Use React context API as a foundation and implement concepts like actions, reducers, and subscribers.'
    },
    { 
      id: 9, 
      domain: 'frontend', 
      company: 'Twitter',
      difficulty: 'easy', 
      question: 'Create an autocomplete search component', 
      description: 'Implement a search input that shows suggestions as the user types, with keyboard navigation support.',
      hint: 'Focus on accessibility features like ARIA attributes and keyboard navigation with arrow keys.'
    },
    { 
      id: 10, 
      domain: 'frontend', 
      company: 'LinkedIn',
      difficulty: 'medium', 
      question: 'Implement an infinite scroll with React', 
      description: 'Create a component that loads more content as the user scrolls down, with loading indicators and error handling.',
      hint: 'Use IntersectionObserver to detect when the user is near the bottom of the content and trigger data fetching.'
    },
    
    // Backend Domain
    { 
      id: 11, 
      domain: 'backend', 
      company: 'Amazon',
      difficulty: 'hard', 
      question: 'Design a rate limiting middleware', 
      description: 'Create a middleware that restricts the number of requests a client can make within a specific timeframe.',
      hint: 'Consider using token bucket or sliding window algorithms for effective rate limiting implementation.'
    },
    { 
      id: 12, 
      domain: 'backend', 
      company: 'Google',
      difficulty: 'medium', 
      question: 'Implement a job queue system', 
      description: 'Design a system that can queue tasks and process them asynchronously with retries and error handling.',
      hint: 'Consider using a message broker like Redis for queue management and implement worker processes for job execution.'
    },
    { 
      id: 13, 
      domain: 'backend', 
      company: 'Microsoft',
      difficulty: 'hard', 
      question: 'Build a distributed caching system', 
      description: 'Design and implement a caching mechanism that works across multiple server instances with invalidation strategies.',
      hint: 'Consider consistency models and explore solutions like Redis or Memcached for distributed caching.'
    },
    { 
      id: 14, 
      domain: 'backend', 
      company: 'Netflix',
      difficulty: 'medium', 
      question: 'Create a RESTful API with authentication', 
      description: 'Develop an API with proper authentication methods like JWT or OAuth, role-based access control, and secure endpoints.',
      hint: 'Implement middleware for authentication verification and use appropriate hashing for password storage.'
    },
    { 
      id: 15, 
      domain: 'backend', 
      company: 'Meta',
      difficulty: 'easy', 
      question: 'Implement database connection pooling', 
      description: 'Create an efficient database connection management system that reuses connections and handles failures gracefully.',
      hint: 'Focus on connection lifecycle management, maximum pool size, and timeout configurations.'
    },
    { 
      id: 16, 
      domain: 'backend', 
      company: 'Uber',
      difficulty: 'hard', 
      question: 'Design a service discovery mechanism', 
      description: 'Create a system that allows services to find and communicate with each other in a microservices architecture.',
      hint: 'Explore consul, etcd, or zookeeper concepts for implementing service registry and discovery.'
    },
    { 
      id: 17, 
      domain: 'backend', 
      company: 'Twitter',
      difficulty: 'medium', 
      question: 'Implement a websocket server for real-time updates', 
      description: 'Build a scalable server that handles websocket connections for real-time bidirectional communication.',
      hint: 'Consider connection management, broadcasting messages, and handling disconnections gracefully.'
    },
    { 
      id: 18, 
      domain: 'backend', 
      company: 'Stripe',
      difficulty: 'hard', 
      question: 'Create an idempotent API', 
      description: 'Design endpoints that can be called multiple times without causing duplicate transactions or side effects.',
      hint: 'Use idempotency keys and implement proper request deduplication logic with appropriate storage.'
    },
    { 
      id: 19, 
      domain: 'backend', 
      company: 'Shopify',
      difficulty: 'easy', 
      question: 'Implement file uploads with progress tracking', 
      description: 'Create an API endpoint that accepts file uploads and provides real-time progress information.',
      hint: 'Use streams for file handling and implement appropriate progress calculation and reporting mechanisms.'
    },
    { 
      id: 20, 
      domain: 'backend', 
      company: 'Dropbox',
      difficulty: 'medium', 
      question: 'Build a role-based access control system', 
      description: 'Implement a flexible permissions system with roles, capabilities, and hierarchical access control.',
      hint: 'Design a database schema that efficiently represents roles, permissions, and relationships between them.'
    },
    
    // Database Domain
    { 
      id: 21, 
      domain: 'database', 
      company: 'Oracle',
      difficulty: 'hard', 
      question: 'Design a sharding strategy for a distributed database', 
      description: 'Create an approach for partitioning data across multiple database instances with considerations for joins and aggregations.',
      hint: 'Consider different sharding keys and strategies like range-based, hash-based, or directory-based sharding.'
    },
    { 
      id: 22, 
      domain: 'database', 
      company: 'MongoDB',
      difficulty: 'medium', 
      question: 'Implement an efficient indexing strategy', 
      description: 'Design database indexes that optimize query performance for various access patterns without sacrificing write performance.',
      hint: 'Analyze query patterns to determine composite indexes, covered queries, and appropriate index types.'
    },
    { 
      id: 23, 
      domain: 'database', 
      company: 'Amazon',
      difficulty: 'hard', 
      question: 'Design a multi-model database solution', 
      description: 'Create a system that leverages different database types (relational, document, graph) for appropriate data workloads.',
      hint: 'Focus on data consistency across models and efficient querying strategies for each data type.'
    },
    { 
      id: 24, 
      domain: 'database', 
      company: 'Snowflake',
      difficulty: 'medium', 
      question: 'Optimize SQL queries for large datasets', 
      description: 'Analyze and improve the performance of complex queries running on terabyte-scale databases.',
      hint: 'Consider execution plans, appropriate indexing, and query rewriting techniques to improve performance.'
    },
    { 
      id: 25, 
      domain: 'database', 
      company: 'Microsoft',
      difficulty: 'easy', 
      question: 'Implement database migrations with zero downtime', 
      description: 'Create a strategy for evolving database schema without service interruptions.',
      hint: 'Use techniques like dual writes, shadow tables, and gradual schema migrations with backward compatibility.'
    },
    { 
      id: 26, 
      domain: 'database', 
      company: 'Google',
      difficulty: 'hard', 
      question: 'Design a time-series database', 
      description: 'Create a specialized database optimized for storing and querying time-series data efficiently.',
      hint: 'Focus on data compression, efficient range queries, and time-based partitioning strategies.'
    },
    { 
      id: 27, 
      domain: 'database', 
      company: 'Netflix',
      difficulty: 'medium', 
      question: 'Implement a caching layer for database queries', 
      description: 'Design a system that caches database results with appropriate invalidation strategies.',
      hint: 'Consider cache coherence, TTL policies, and write-through vs. write-behind caching approaches.'
    },
    { 
      id: 28, 
      domain: 'database', 
      company: 'LinkedIn',
      difficulty: 'hard', 
      question: 'Create a graph-based recommendation engine', 
      description: 'Design a database and query approach for generating personalized recommendations based on graph relationships.',
      hint: 'Explore algorithms like collaborative filtering, PageRank, and shortest path for recommendation generation.'
    },
    { 
      id: 29, 
      domain: 'database', 
      company: 'Uber',
      difficulty: 'easy', 
      question: 'Implement database connection pooling', 
      description: 'Create an efficient mechanism for managing database connections to improve performance and resource utilization.',
      hint: 'Focus on connection lifecycle, pool size limits, and health checking for optimal pooling implementation.'
    },
    { 
      id: 30, 
      domain: 'database', 
      company: 'Twitter',
      difficulty: 'medium', 
      question: 'Design a database schema for a social media platform', 
      description: 'Create an efficient and scalable data model for users, posts, comments, likes, and relationships.',
      hint: 'Consider denormalization strategies and efficient query patterns for common social media operations.'
    },
    
    // System Design Domain
    { 
      id: 31, 
      domain: 'system', 
      company: 'Google',
      difficulty: 'hard', 
      question: 'Design a distributed file storage system', 
      description: 'Create an architecture for storing and retrieving files across multiple servers with reliability and scalability.',
      hint: 'Consider concepts like sharding, replication, and partitioning for distributed file storage.'
    },
    { 
      id: 32, 
      domain: 'system', 
      company: 'Meta',
      difficulty: 'medium', 
      question: 'Design a notification service', 
      description: 'Create a system that delivers various types of notifications (push, email, SMS) to users at scale.',
      hint: 'Focus on delivery guarantees, retry mechanisms, and handling delivery provider failures.'
    },
    { 
      id: 33, 
      domain: 'system', 
      company: 'Netflix',
      difficulty: 'hard', 
      question: 'Design a video streaming platform', 
      description: 'Create an architecture for encoding, storing, and streaming video content to millions of users.',
      hint: 'Consider CDN integration, adaptive bitrate streaming, and content preprocessing strategies.'
    },
    { 
      id: 34, 
      domain: 'system', 
      company: 'Amazon',
      difficulty: 'medium', 
      question: 'Design a URL shortening service', 
      description: 'Create a system that generates short URLs for long links with analytics capabilities.',
      hint: 'Focus on hash function design, collision handling, and efficient storage for URL mappings.'
    },
    { 
      id: 35, 
      domain: 'system', 
      company: 'Uber',
      difficulty: 'hard', 
      question: 'Design a ride-sharing service', 
      description: 'Create an architecture for matching riders with drivers efficiently with location tracking and payments.',
      hint: 'Consider geospatial indexing, real-time matching algorithms, and payment processing integration.'
    },
    { 
      id: 36, 
      domain: 'system', 
      company: 'Twitter',
      difficulty: 'hard', 
      question: 'Design a real-time analytics platform', 
      description: 'Create a system that processes and analyzes millions of events per second with minimal latency.',
      hint: 'Explore stream processing technologies and time-window aggregation techniques for real-time insights.'
    },
    { 
      id: 37, 
      domain: 'system', 
      company: 'LinkedIn',
      difficulty: 'medium', 
      question: 'Design a content feed system', 
      description: 'Create an architecture for generating personalized content feeds for users with ranking and filtering.',
      hint: 'Consider pre-computation strategies, caching mechanisms, and efficient ranking algorithms.'
    },
    { 
      id: 38, 
      domain: 'system', 
      company: 'Airbnb',
      difficulty: 'medium', 
      question: 'Design a booking and reservation system', 
      description: 'Create an architecture for managing property bookings with availability tracking and conflict resolution.',
      hint: 'Focus on concurrency control, transaction management, and eventual consistency models.'
    },
    { 
      id: 39, 
      domain: 'system', 
      company: 'Dropbox',
      difficulty: 'hard', 
      question: 'Design a file synchronization service', 
      description: 'Create a system that efficiently synchronizes files across multiple devices with conflict resolution.',
      hint: 'Consider delta sync algorithms, efficient change detection, and conflict resolution strategies.'
    },
    { 
      id: 40, 
      domain: 'system', 
      company: 'Stripe',
      difficulty: 'medium', 
      question: 'Design a payment processing system', 
      description: 'Create an architecture for securely processing payments with multiple providers and failure handling.',
      hint: 'Focus on idempotency, transaction atomicity, and secure credential management.'
    },
    
    // Security Domain
    { 
      id: 41, 
      domain: 'security', 
      company: 'Microsoft',
      difficulty: 'hard', 
      question: 'Implement a secure authentication system', 
      description: 'Design a comprehensive authentication system with multi-factor authentication, account recovery, and session management.',
      hint: 'Consider password hashing, secure token management, and protection against common authentication attacks.'
    },
    { 
      id: 42, 
      domain: 'security', 
      company: 'Google',
      difficulty: 'medium', 
      question: 'Create a secure API authorization framework', 
      description: 'Design a system for managing API access with fine-grained permissions and token validation.',
      hint: 'Focus on JWT implementation, scope-based permissions, and token refresh mechanisms.'
    },
    { 
      id: 43, 
      domain: 'security', 
      company: 'Meta',
      difficulty: 'hard', 
      question: 'Design a secure data encryption strategy', 
      description: 'Create an approach for encrypting sensitive data at rest and in transit with key management.',
      hint: 'Explore encryption algorithms, key rotation policies, and secure key storage mechanisms.'
    },
    { 
      id: 44, 
      domain: 'security', 
      company: 'PayPal',
      difficulty: 'medium', 
      question: 'Implement CSRF protection mechanisms', 
      description: 'Design protections against Cross-Site Request Forgery attacks for web applications.',
      hint: 'Consider token-based approaches, same-site cookie policies, and origin verification techniques.'
    },
    { 
      id: 45, 
      domain: 'security', 
      company: 'Amazon',
      difficulty: 'easy', 
      question: 'Create input validation and sanitization strategies', 
      description: 'Design approaches for validating and sanitizing user input to prevent injection attacks.',
      hint: 'Focus on context-aware sanitization and parameterized queries to prevent various injection attacks.'
    },
    { 
      id: 46, 
      domain: 'security', 
      company: 'Stripe',
      difficulty: 'hard', 
      question: 'Design a secure secrets management system', 
      description: 'Create a system for storing and distributing API keys and credentials securely across services.',
      hint: 'Consider encryption at rest, access control mechanisms, and secure distribution channels.'
    },
    { 
      id: 47, 
      domain: 'security', 
      company: 'Netflix',
      difficulty: 'medium', 
      question: 'Implement secure file upload handling', 
      description: 'Design a system for accepting file uploads while preventing security vulnerabilities.',
      hint: 'Focus on content validation, safe storage practices, and scanning for malicious content.'
    },
    { 
      id: 48, 
      domain: 'security', 
      company: 'Apple',
      difficulty: 'hard', 
      question: 'Create a secure mobile authentication framework', 
      description: 'Design a system for authenticating mobile app users securely with biometrics and device verification.',
      hint: 'Consider certificate pinning, secure storage of credentials, and protection against MitM attacks.'
    },
    { 
      id: 49, 
      domain: 'security', 
      company: 'Coinbase',
      difficulty: 'medium', 
      question: 'Implement a secure password reset flow', 
      description: 'Design a comprehensive password recovery system that is both secure and user-friendly.',
      hint: 'Focus on time-limited tokens, secure delivery channels, and protection against account enumeration.'
    },
    { 
      id: 50, 
      domain: 'security', 
      company: 'Slack',
      difficulty: 'easy', 
      question: 'Design secure cookie management', 
      description: 'Create strategies for securely storing and transmitting cookies in web applications.',
      hint: 'Consider security flags like Secure, HttpOnly, SameSite, and appropriate expiration policies.'
    },
  ];

  // Extract unique companies for filter
  const allCompanies = [...new Set(questions.map(q => q.company))];
  
  // Toggle company selection
  const toggleCompany = (company) => {
    setSelectedCompanies(prev => 
      prev.includes(company) 
        ? prev.filter(c => c !== company) 
        : [...prev, company]
    );
  };

  // Get domain icon based on domain name
  const getDomainIcon = (domain) => {
    const iconProps = { size: 18, className: "text-current" };
    switch(domain) {
      case 'frontend': return <Code {...iconProps} />;
      case 'backend': return <Server {...iconProps} />;
      case 'database': return <Database {...iconProps} />;
      case 'system': return <Globe {...iconProps} />;
      case 'security': return <Lock {...iconProps} />;
      default: return <BookOpen {...iconProps} />;
    }
  };

  // Get domain display name
  const getDomainName = (domain) => {
    switch(domain) {
      case 'frontend': return 'Frontend';
      case 'backend': return 'Backend';
      case 'database': return 'Database';
      case 'system': return 'System Design';
      case 'security': return 'Security';
      default: return domain;
    }
  };

  // Get difficulty class for styling
  const getDifficultyClass = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
      case 'hard': return 'bg-red-500/10 text-red-600 dark:text-red-400';
      default: return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    }
  };

  // Filter questions based on active filters and search query
  const filteredQuestions = questions.filter(question => {
    const domainMatch = activeFilter === 'all' || question.domain === activeFilter;
    const difficultyMatch = difficultyFilter === 'all' || question.difficulty === difficultyFilter;
    const companyMatch = selectedCompanies.length === 0 || selectedCompanies.includes(question.company);
    const searchMatch = question.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       question.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       question.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return domainMatch && difficultyMatch && companyMatch && searchMatch;
  });

  // Toggle question expansion
  const toggleQuestion = (id) => {
    setExpandedQuestion(prev => prev === id ? null : id);
  };

  // Toggle all questions
  const toggleAllQuestions = () => {
    if (expandedQuestion === null) {
      setExpandedQuestion(filteredQuestions[0]?.id);
    } else {
      setExpandedQuestion(null);
    }
  };

  return (
    <div className="min-h-screen bg-bg-secondary p-4 md:p-6 lg:p-8 transition-colors duration-300">
      {/* Header */}
      <div className="bg-primary rounded-xl p-6 mb-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Top 50 Company Interview Questions</h1>
            <p className="text-white/90 mt-2">
              Curated collection of technical interview questions from top tech companies
            </p>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light hover:bg-primary-light/50 text-white transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <>
                <Sun size={18} />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={18} />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-bg-primary rounded-xl p-4 mb-6 shadow-lg border border-border-color">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-text-secondary" size={18} />
            </div>
            <input
              type="text"
              placeholder="Search questions, companies, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-bg-secondary border border-border-color focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Domain Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="text-text-secondary" size={18} />
              </div>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-bg-secondary border border-border-color focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
              >
                <option value="all">All Domains</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="system">System Design</option>
                <option value="security">Security</option>
              </select>
            </div>
            
            {/* Difficulty Filter */}
            <div className="relative">
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full pl-4 pr-4 py-3 rounded-lg bg-bg-secondary border border-border-color focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Toggle All Button */}
            <button
              onClick={toggleAllQuestions}
              className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border-color hover:bg-primary-light/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            >
              {expandedQuestion === null ? 'Expand All' : 'Collapse All'}
            </button>
          </div>

          {/* Company Filter Chips */}
          <div className="flex flex-wrap gap-2 mt-2">
            {allCompanies.map(company => (
              <button
                key={company}
                onClick={() => toggleCompany(company)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCompanies.includes(company)
                    ? 'bg-primary text-white'
                    : 'bg-bg-secondary border border-border-color hover:bg-primary-light/10'
                }`}
              >
                {company}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Questions List */}
      <div className="bg-bg-primary rounded-xl shadow-lg overflow-hidden border border-border-color">
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-lg text-text-secondary">No questions match your filters. Try adjusting your search criteria.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border-color">
            {filteredQuestions.map((question) => (
              <li 
                key={question.id}
                className={`transition-colors ${
                  expandedQuestion === question.id 
                    ? 'bg-primary-light/10' 
                    : 'hover:bg-primary-light/5'
                }`}
              >
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => toggleQuestion(question.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg mt-1 ${
                        expandedQuestion === question.id 
                          ? 'bg-primary text-white' 
                          : 'bg-primary-light/20 text-primary'
                      }`}>
                        {getDomainIcon(question.domain)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-text-primary">{question.question}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="text-sm text-text-secondary">{question.company}</span>
                          <span className={`text-xs px-2.5 py-1 rounded-full ${getDifficultyClass(question.difficulty)}`}>
                            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                          </span>
                          <span className="text-sm text-text-secondary">{getDomainName(question.domain)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-text-secondary">
                      {expandedQuestion === question.id ? 
                        <ChevronUp size={20} /> : 
                        <ChevronDown size={20} />
                      }
                    </div>
                  </div>
                  
                  {/* Expanded content */}
                  {expandedQuestion === question.id && (
                    <div className="mt-4 pl-12 pr-4">
                      <p className="mb-4 text-text-primary">{question.description}</p>
                      <div className="bg-bg-secondary p-4 rounded-lg border border-border-color">
                        <h4 className="text-sm font-semibold mb-2 text-primary">Hint:</h4>
                        <p className="text-sm text-text-primary">{question.hint}</p>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Stats at bottom */}
      <div className="mt-6 text-center text-text-secondary text-sm">
        Showing {filteredQuestions.length} of {questions.length} questions
        {selectedCompanies.length > 0 && ` (Filtered by ${selectedCompanies.length} companies)`}
      </div>
    </div>
  );
};

export default FAQ;