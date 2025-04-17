import React, { useState } from 'react';
import { FaGithub, FaCode, FaLaptopCode, FaMobileAlt, FaRobot, FaChartLine, FaFilter, FaTimes } from 'react-icons/fa';
import '../../styles/student/Projects.css';

const Projects = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeTab, setActiveTab] = useState("Projects");
  const [breadcrumbs, setBreadcrumbs] = useState([activeTab]);

  const projectCategories = {
    beginner: {
      title: "Beginner",
      icon: <FaCode className="level-icon beginner" />,
      description: "Great for students just starting out",
      color: "var(--beginner-color)"
    },
    intermediate: {
      title: "Intermediate",
      icon: <FaLaptopCode className="level-icon intermediate" />,
      description: "For students with some coding experience",
      color: "var(--intermediate-color)"
    },
    advanced: {
      title: "Advanced",
      icon: <FaRobot className="level-icon advanced" />,
      description: "Challenging projects for experienced coders",
      color: "var(--advanced-color)"
    }
  };

  const techDomains = [
    { id: 'web', name: 'Web Dev', icon: <FaLaptopCode />, color: "var(--web-color)" },
    { id: 'mobile', name: 'Mobile', icon: <FaMobileAlt />, color: "var(--mobile-color)" },
    { id: 'ai', name: 'AI/ML', icon: <FaRobot />, color: "var(--ai-color)" },
    { id: 'data', name: 'Data Science', icon: <FaChartLine />, color: "var(--data-color)" }
  ];

  // Sample projects data
  const projects = [
    {
      id: 1,
      title: "Personal Portfolio Website",
      level: "beginner",
      domains: ["web"],
      description: "Build your own portfolio using modern web technologies to showcase your skills and projects.",
      githubUrl: "https://github.com/awesome-portfolio-projects",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "E-commerce App",
      level: "intermediate",
      domains: ["web", "mobile"],
      description: "Create a full-stack e-commerce application with product listings, cart functionality, and user authentication.",
      githubUrl: "https://github.com/ecommerce-templates",
      tags: ["React", "Node.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Sentiment Analysis Tool",
      level: "advanced",
      domains: ["ai", "data"],
      description: "Natural Language Processing project to analyze sentiment in text data using machine learning models.",
      githubUrl: "https://github.com/sentiment-analysis-projects",
      tags: ["Python", "NLTK", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      title: "Task Management App",
      level: "beginner",
      domains: ["web"],
      description: "Simple task manager with CRUD operations to help you organize your daily activities.",
      githubUrl: "https://github.com/task-manager-projects",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      title: "Weather Forecast App",
      level: "intermediate",
      domains: ["mobile"],
      description: "Mobile application that displays weather forecasts using data from a public weather API.",
      githubUrl: "https://github.com/weather-app-projects",
      tags: ["Flutter", "Dart", "API"],
      image: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 6,
      title: "Stock Market Predictor",
      level: "advanced",
      domains: ["ai", "data"],
      description: "Machine learning model that analyzes historical stock data to predict future trends.",
      githubUrl: "https://github.com/stock-prediction-projects",
      tags: ["Python", "Pandas", "Scikit-learn"],
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const levelMatch = selectedLevel === 'all' || project.level === selectedLevel;
    const domainMatch = selectedDomain === 'all' || 
                       project.domains.includes(selectedDomain);
    return levelMatch && domainMatch;
  });

  const handleLevelFilter = (level) => {
    setSelectedLevel(level);
    if (level !== 'all') {
      setActiveFilters([...activeFilters, { type: 'level', value: level }]);
    } else {
      setActiveFilters(activeFilters.filter(f => f.type !== 'level'));
    }
  };

  const handleDomainFilter = (domain) => {
    setSelectedDomain(domain);
    if (domain !== 'all') {
      setActiveFilters([...activeFilters, { type: 'domain', value: domain }]);
    } else {
      setActiveFilters(activeFilters.filter(f => f.type !== 'domain'));
    }
  };

  const removeFilter = (filterToRemove) => {
    if (filterToRemove.type === 'level') {
      setSelectedLevel('all');
    } else {
      setSelectedDomain('all');
    }
    setActiveFilters(activeFilters.filter(f => 
      !(f.type === filterToRemove.type && f.value === filterToRemove.value)
    ));
  };

  const resetFilters = () => {
    setSelectedLevel('all');
    setSelectedDomain('all');
    setActiveFilters([]);
  };

  return (
    <div className="projects-page">
      <div className="breadcrumb-container">
        <div className="breadcrumbs">
          <span>Projects</span>
        </div>
      </div>
      <div className="page-content">
        <div className="controls">
          <div className="filter-section">
            <h3 className="filter-title">
              <FaFilter className="filter-icon" /> Filter by:
            </h3>
            
            {activeFilters.length > 0 && (
              <div className="active-filters">
                {activeFilters.map((filter, index) => (
                  <span key={index} className="active-filter">
                    {filter.type === 'level' ? (
                      <>
                        {projectCategories[filter.value].icon}
                        {projectCategories[filter.value].title}
                      </>
                    ) : (
                      <>
                        {techDomains.find(d => d.id === filter.value)?.icon}
                        {techDomains.find(d => d.id === filter.value)?.name}
                      </>
                    )}
                    <button 
                      onClick={() => removeFilter(filter)}
                      className="remove-filter"
                    >
                      <FaTimes />
                    </button>
                  </span>
                ))}
                <button 
                  onClick={resetFilters}
                  className="clear-filters"
                >
                  Clear all
                </button>
              </div>
            )}

            <div className="filter-groups">
              <div className="filter-group">
                <h4>Difficulty Level</h4>
                <div className="level-filters">
                  <button 
                    className={`level-filter ${selectedLevel === 'all' ? 'active' : ''}`}
                    onClick={() => handleLevelFilter('all')}
                  >
                    All Levels
                  </button>
                  {Object.entries(projectCategories).map(([key, category]) => (
                    <button
                      key={key}
                      className={`level-filter ${selectedLevel === key ? 'active' : ''}`}
                      onClick={() => handleLevelFilter(key)}
                      style={selectedLevel === key ? { 
                        backgroundColor: category.color,
                        borderColor: category.color,
                        color: 'white'
                      } : {}}
                    >
                      {category.icon}
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Tech Domain</h4>
                <div className="domain-filters">
                  <button
                    className={`domain-filter ${selectedDomain === 'all' ? 'active' : ''}`}
                    onClick={() => handleDomainFilter('all')}
                  >
                    All Domains
                  </button>
                  {techDomains.map(domain => (
                    <button
                      key={domain.id}
                      className={`domain-filter ${selectedDomain === domain.id ? 'active' : ''}`}
                      onClick={() => handleDomainFilter(domain.id)}
                      style={selectedDomain === domain.id ? { 
                        backgroundColor: domain.color,
                        borderColor: domain.color,
                        color: 'white'
                      } : {}}
                    >
                      {domain.icon}
                      {domain.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="projects-container">
          {filteredProjects.length > 0 ? (
            <div className="projects-grid">
              {filteredProjects.map(project => (
                <div key={project.id} className="project-card">
                  <div 
                    className="project-image"
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>
                  
                  <div className="project-content">
                    <div className="project-header">
                      <span 
                        className="difficulty-badge"
                        style={{ 
                          backgroundColor: projectCategories[project.level].color,
                          borderColor: projectCategories[project.level].color
                        }}
                      >
                        {projectCategories[project.level].icon}
                        {projectCategories[project.level].title}
                      </span>
                      <h3>{project.title}</h3>
                    </div>
                    
                    <div className="project-domains">
                      {project.domains.map(domainId => {
                        const domain = techDomains.find(d => d.id === domainId);
                        return (
                          <span 
                            key={domainId} 
                            className="domain-tag"
                            style={{ borderColor: domain?.color }}
                          >
                            {domain?.icon}
                            {domain?.name}
                          </span>
                        );
                      })}
                    </div>
                    
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-footer">
                      <div className="project-tags">
                        {project.tags.map(tag => (
                          <span key={tag} className="tech-tag">{tag}</span>
                        ))}
                      </div>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-link"
                      >
                        <FaGithub /> View on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-projects">
              <div className="no-projects-content">
                <h3>No projects found matching your filters</h3>
                <p>Try adjusting your filters or browse all projects</p>
                <button 
                  onClick={resetFilters}
                  className="reset-filters"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="github-inspiration">
          <h2>More Project Inspiration</h2>
          <p className="inspiration-subtitle">Explore these curated collections for additional ideas</p>
          
          <div className="github-repos">
            <div className="repo-card">
              <div className="repo-icon">
                <FaGithub />
              </div>
              <h3>Awesome Beginner Projects</h3>
              <p>Curated list of beginner-friendly projects across various technologies</p>
              <a 
                href="https://github.com/MunGell/awesome-for-beginners" 
                target="_blank" 
                rel="noopener noreferrer"
                className="repo-link"
              >
                View Repository
              </a>
            </div>
            
            <div className="repo-card">
              <div className="repo-icon">
                <FaCode />
              </div>
              <h3>Build Your Own X</h3>
              <p>Tutorials for building various applications from scratch</p>
              <a 
                href="https://github.com/codecrafters-io/build-your-own-x" 
                target="_blank" 
                rel="noopener noreferrer"
                className="repo-link"
              >
                View Repository
              </a>
            </div>
            
            <div className="repo-card">
              <div className="repo-icon">
                <FaLaptopCode />
              </div>
              <h3>Project-Based Learning</h3>
              <p>Comprehensive resources for learning through projects</p>
              <a 
                href="https://github.com/practical-tutorials/project-based-learning" 
                target="_blank" 
                rel="noopener noreferrer"
                className="repo-link"
              >
                View Repository
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;