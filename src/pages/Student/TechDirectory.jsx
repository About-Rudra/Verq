import React, { useState } from 'react';
import '../../styles/Student/TechDirectory.css';

function TechDirectory() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Add state for activeTab and breadcrumbs
  const [activeTab, setActiveTab] = useState("Tech Directory");
  const [breadcrumbs, setBreadcrumbs] = useState([activeTab]); // Initialize with the active tab
  
  const categories = [
    'All',
    'Artificial Intelligence',
    'Data Science',
    'Development tools',
    'End user applications',
    'Cloud',
    'Operating systems',
    'Devops',
    'Cyber Security',
    'SDE',
    'Other'
  ];
  
  // Initial companies data
  const allCompanies = [
    {
      id: 1,
      name: "52°North Spatial Information",
      description: "Innovative ideas & technologies in geoinformatics",
      logo: "/api/placeholder/80/80",
      category: "Data Science"
    },
    {
      id: 2,
      name: "AboutCode",
      description: "Scan code for origin, license and vulnerabilities",
      logo: "/api/placeholder/80/80",
      category: "Cyber Security"
    },
    {
      id: 3,
      name: "Accord Project",
      description: "Open source software for smart legal contracts",
      logo: "/api/placeholder/80/80",
      category: "SDE"
    }
  ];
  
  // Handle tab change - same as in Dashboard
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setBreadcrumbs([tab]); // Update breadcrumbs to only show the current tab
  };
  
  // Handle filter click
  const handleFilterClick = (category) => {
    setActiveFilter(category);
  };
  
  // Handle sort change
  const handleSortChange = (order) => {
    setSortOrder(order);
  };
  
  // Handle view change
  const handleViewChange = (mode) => {
    setViewMode(mode);
  };
  
  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // Filter companies based on active filter and search term
  const filteredCompanies = allCompanies.filter(company => {
    const matchesFilter = activeFilter === 'All' || company.category === activeFilter;
    const matchesSearch = 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  
  // Sort companies based on selected sort order
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortOrder === 'A-Z') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'Z-A') {
      return b.name.localeCompare(a.name);
    } else if (sortOrder === 'Random') {
      return 0.5 - Math.random();
    }
    return 0;
  });
  
  return (
    <div className="page-container">
      <div className="main-content">
        {/* Move the header with breadcrumbs to the top, just like in Dashboard */}
        <div className="header">
          <div className="breadcrumbs">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <span>{crumb}</span>
                {index < breadcrumbs.length - 1 && <span>›</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="tech-directory">
          <div className="header-section">
            <p className="subtitle">Explore technology organizations and open source projects</p>
          </div>
          
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
                value={searchTerm}
                onChange={handleSearchChange}
              />
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
                  aria-label="Grid view"
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
                  aria-label="List view"
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
          
          {/* Results summary */}
          <div className="results-summary">
            Showing {sortedCompanies.length} of {allCompanies.length} organizations
            {activeFilter !== 'All' && ` in ${activeFilter}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
          
          {/* Companies grid/list */}
          <div className={`companies-container ${viewMode}`}>
            {sortedCompanies.length > 0 ? (
              sortedCompanies.map(company => (
                <div key={company.id} className="company-card">
                  <div className="company-logo">
                    <img src={company.logo} alt={`${company.name} logo`} />
                  </div>
                  <div className="company-info">
                    <h3 className="company-name">{company.name}</h3>
                    <div className="category-badge">{company.category}</div>
                    <p className="company-description">{company.description}</p>
                  </div>
                  <div className="company-actions">
                    <a href={`/tech-details/${company.id}`} className="view-button">
                      View Details
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                </svg>
                <p>No organizations match your search criteria</p>
                <button onClick={() => {setActiveFilter('All'); setSearchTerm('')}} className="reset-button">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechDirectory;