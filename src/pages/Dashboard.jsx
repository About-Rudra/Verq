import React, { useState } from 'react';
import Sidebar from "../components/Sidebar"; 
import "../styles/Dashboard.css";

// Tech Stack Card Component
const TechStackCard = () => {
  const [techStack, setTechStack] = useState([
    
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTech, setNewTech] = useState('');
  
  // Common tech options for quick selection
  const techOptions = [
    'HTML', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 
    'PostgreSQL', 'Python', 'Django', 'Java', 'Spring', 
    'Docker', 'AWS', 'Firebase'
  ];
  
  const handleAddTech = () => {
    if (newTech.trim() !== '') {
      const newId = techStack.length > 0 ? Math.max(...techStack.map(tech => tech.id)) + 1 : 1;
      setTechStack([...techStack, { id: newId, name: newTech.trim() }]);
      setNewTech('');
    }
  };
  
  const handleQuickAdd = (tech) => {
    if (!techStack.some(item => item.name.toLowerCase() === tech.toLowerCase())) {
      const newId = techStack.length > 0 ? Math.max(...techStack.map(tech => tech.id)) + 1 : 1;
      setTechStack([...techStack, { id: newId, name: tech }]);
    }
  };
  
  const handleRemoveTech = (id) => {
    setTechStack(techStack.filter(tech => tech.id !== id));
  };
  
  return (
    <div className="card tech-stack-card">
      <h2>Tech Stack</h2>
      
      <div className="tech-list">
        {techStack.map(tech => (
          <div key={tech.id} className="tech-item">
            <span>{tech.name}</span>
            <button 
              className="remove-tech-btn" 
              onClick={() => handleRemoveTech(tech.id)}
              aria-label={`Remove ${tech.name}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      {showAddForm ? (
        <div className="add-tech-form">
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            placeholder="Enter technology name"
            className="tech-input"
          />
          <div className="tech-form-actions">
            <button className="btn-add-tech" onClick={handleAddTech}>Add</button>
            <button className="btn-cancel" onClick={() => {
              setShowAddForm(false);
              setNewTech('');
            }}>Cancel</button>
          </div>
          
          <div className="quick-add-options">
            <p>Quick add:</p>
            <div className="tech-options">
              {techOptions.filter(tech => 
                !techStack.some(item => item.name.toLowerCase() === tech.toLowerCase())
              ).slice(0, 6).map((tech, index) => (
                <button 
                  key={index} 
                  className="quick-add-btn"
                  onClick={() => handleQuickAdd(tech)}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <button 
          className="btn-action add-tech-btn" 
          onClick={() => setShowAddForm(true)}
        >
          + Add Technology
        </button>
      )}
    </div>
  );
};

// Profile Card Component
const ProfileCard = () => {
  return (
    <div className="card profile-card">
      <h2>Profile</h2>
      <div className="profile-content">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            <span>UR</span>
          </div>
        </div>
        <div className="profile-info">
          <h3>Uttkarsh</h3>
          <p className="profile-title">Full Stack Developer</p>
          <p className="profile-stats">
            <span>1 year experience 7 projects</span>
          </p>
        </div>
      </div>
      <button className="btn-action">Edit Profile</button>
    </div>
  );
};

// Projects Card Component
const ProjectsCard = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "E-commerce App", tech: ["React", "Node.js"], progress: 75 },
    { id: 2, name: "Portfolio Website", tech: ["HTML", "CSS", "JavaScript"], progress: 100 },
    { id: 3, name: "Task Manager", tech: ["React", "Firebase"], progress: 40 }
  ]);
  
  return (
    <div className="card projects-card">
      <h2>Projects</h2>
      <div className="projects-list">
        {projects.map(project => (
          <div key={project.id} className="project-item">
            <div className="project-header">
              <h3>{project.name}</h3>
              <span className="project-status">{project.progress}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <div className="project-technologies">
              {project.tech.map((tech, index) => (
                <span key={index} className="project-tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="btn-action">View All Projects</button>
    </div>
  );
};

// Resume Card Component
const ResumeCard = () => {
  return (
    <div className="card resume-card">
      <h2>Resume</h2>
      <div className="resume-preview">
        <div className="resume-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" height="50">
            <path d="M7 18H17V16H7V18Z" fill="currentColor" />
            <path d="M17 14H7V12H17V14Z" fill="currentColor" />
            <path d="M7 10H11V8H7V10Z" fill="currentColor" />
            <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM5 5C5 4.44772 5.44772 4 6 4H14C16.7614 4 19 6.23858 19 9V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5Z" fill="currentColor" />
          </svg>
        </div>
        <div className="resume-stats">
          <p>Last updated: March 5, 2025</p>
          <p>2 page document</p>
        </div>
      </div>
      <div className="resume-actions">
        <button className="btn-action">Download PDF</button>
        <button className="btn-secondary">Update Resume</button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [breadcrumbs, setBreadcrumbs] = useState([activeTab]); // Initialize with the active tab
  const [darkMode, setDarkMode] = useState(false);

  // Function to get the greeting based on the current time
  const getGreeting = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setBreadcrumbs([tab]); // Update breadcrumbs to only show the current tab
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme');
  };

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="main-content">
        <div className="header">
          <div className="breadcrumbs">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <span>{crumb}</span>
                {index < breadcrumbs.length - 1 && <span>›</span>}
              </React.Fragment>
            ))}
          </div>
          <div className="actions">
            <button className="btn-manage" onClick={toggleTheme} aria-label="Toggle Dark Mode">
              {darkMode ? 'Light' : 'Dark'}
            </button>
            <button className="btn-share" aria-label="Notifications">
              Notifications
            </button>
            <button className="btn-more" aria-label="Profile">
              Settings
            </button>
          </div>
        </div>
        <div>
          {/* Dynamically display the greeting */}
          <h1 className="greeting">{getGreeting()}, Uttkarsh</h1>
        </div>
        
        {/* Cards Grid Container */}
        <div className="cards-grid">
          <ProfileCard />
          <TechStackCard />
          <ProjectsCard />
          <ResumeCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;