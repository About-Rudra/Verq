import React, { useState } from 'react';
import '../styles/TechDirectory.css';

// Import company logos
// Note: In a real implementation, you would import actual image files
// For this example, I'm using placeholders

function TechDirectory() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [viewMode, setViewMode] = useState('grid');
  
  const categories = [
    'All',
    'Artificial Intelligence',
    'Data Science',
    'Development tools',
    'End user applications' ,
    'Cloud',
    
    'Devopps',
    'Cyber Security',
    'SDE',
    'Other'
  ];
  
  const companies = [
    {
      name: "52°North Spatial Information",
      description: "Innovative ideas & technologies in geoinformatics",
      logo: "52north-logo.png" // This would be replaced with an actual image import
    },
    {
      name: "AboutCode",
      description: "Scan code for origin, license and vulnerabilities",
      logo: "aboutcode-logo.png" // This would be replaced with an actual image import
    },
    {
      name: "Accord Project",
      description: "Open source software for smart legal contracts",
      logo: "accord-logo.png" // This would be replaced with an actual image import
    }
  ];
  
  const handleFilterClick = (category) => {
    setActiveFilter(category);
  };
  
  const handleSortChange = (order) => {
    setSortOrder(order);
  };
  
  const handleViewChange = (mode) => {
    setViewMode(mode);
  };
  
  return (

    <div> 
      <h1 className='header'> Ongoing Drives</h1>

      <div className="tech-directory">
      {/* Filter categories */}
      <div className="filter-categories">
        {categories.map(category => (
          <button 
            key={category}
            className={`category-button ${activeFilter === category ? 'active' : ''}`}
            onClick={() => handleFilterClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Search bar */}
      <div className="search-container">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search organizations, technology or topics" 
            className="search-input"
          />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        
        {/* Sort and view options */}
        <div className="sort-view-options">
          <div className="sort-options">
            <span className="sort-label">Sort by</span>
            <button 
              className={`sort-button ${sortOrder === 'A-Z' ? 'active' : ''}`}
              onClick={() => handleSortChange('A-Z')}
            >
              A-Z
            </button>
            <button 
              className={`sort-button ${sortOrder === 'Z-A' ? 'active' : ''}`}
              onClick={() => handleSortChange('Z-A')}
            >
              Z-A
            </button>
            <button 
              className={`sort-button ${sortOrder === 'Random' ? 'active' : ''}`}
              onClick={() => handleSortChange('Random')}
            >
              Random
            </button>
          </div>
          
          <div className="view-options">
            <button 
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => handleViewChange('grid')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button 
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => handleViewChange('list')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Companies grid */}
      <div className={`companies-container ${viewMode}`}>
        {companies.map(company => (
          <div key={company.name} className="company-card">
            <div className="company-logo">
              {/* In a real implementation, this would be an actual image */}
              <div className="placeholder-logo">{company.name.charAt(0)}</div>
            </div>
            <div className="company-info">
              <h3 className="company-name">{company.name}</h3>
              <p className="company-description">{company.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Login button */}
      {/* <div className="login-container">
        <button className="login-button">
          Log in
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
      </div> */}
    </div>
 
      </div>

); 
}

export default TechDirectory;