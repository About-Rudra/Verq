import React, { useState } from 'react';
import '../styles/OngoingDrives.css';

const OngoingDrives = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleFilters = () => {
    setExpanded(!expanded);
  };

  // Mock data for companies
  const companies = [
    {
      id: 1,
      name: 'Hughes Communications',
      logo: 'hughes-logo.png',
      rating: 3.5,
      reviews: 130,
      type: 'Indian MNC',
      industry: 'Telecom / ISP',
      founded: '1993'
    },
    {
      id: 2,
      name: 'Frankfinn',
      logo: 'frankfinn-logo.png',
      rating: 4,
      reviews: '1.5K+',
      type: 'Corporate',
      industry: 'Education / Training'
    },
    {
      id: 3,
      name: 'Infinite',
      logo: 'infinite-logo.png',
      rating: 3.4,
      reviews: '1.5K+',
      type: 'Corporate',
      industry: 'IT Services & Consulting'
    },
    {
      id: 4,
      name: 'Alstom Transportation',
      logo: 'alstom-logo.png',
      rating: 3.7,
      reviews: '2.6K+',
      type: 'Foreign MNC',
      industry: 'Engineering & Construction'
    }
  ];

  // Categories with company counts
  const categories = [
    { name: 'MNCs', count: '2.1K+' },
    { name: 'Product', count: '1.1K+' },
    { name: 'Banking & Fina...', count: '371' },
    { name: 'Hospitality', count: '94' },
    { name: 'Fintech', count: '122' }
  ];

  return (
    <div className="company-listing">
      <h1>Ongoing Drives</h1>
      
      <div className="categories-container">
        <div className="categories">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <h2>{category.name}</h2>
              <div className="company-count">
                {category.count} Companies <span className="arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="listing-container">
        <div className="filters-section">
          <div className="filters-header">
            <h2>All Filters</h2>
            <span className="applied-filters">Applied (1)</span>
          </div>

          <div className="company-type-filter">
            <div className="filter-title" onClick={toggleFilters}>
              <h3>Company type</h3>
              <span className={`arrow-icon ${expanded ? 'expanded' : ''}`}>▼</span>
            </div>
            
            <div className={`filter-options ${expanded ? 'show' : ''}`}>
              <label className="filter-option">
                <input type="checkbox" name="foreign-mnc" />
                <span className="checkbox-label">Foreign MNC</span>
                <span className="count">(353)</span>
              </label>
              
              <label className="filter-option">
                <input type="checkbox" name="corporate" />
                <span className="checkbox-label">Corporate</span>
                <span className="count">(321)</span>
              </label>
              
              <label className="filter-option">
                <input type="checkbox" name="indian-mnc" />
                <span className="checkbox-label">Indian MNC</span>
                <span className="count">(144)</span>
              </label>
              
              <label className="filter-option">
                <input type="checkbox" name="startup" />
                <span className="checkbox-label">Startup</span>
                <span className="count">(59)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="results-section">
          <div className="results-count">Showing 891 companies</div>
          
          <div className="company-cards">
            {companies.map(company => (
              <div key={company.id} className="company-card">
                <div className="company-info">
                  <div className="company-logo">
                    <img src={company.logo} alt={`${company.name} logo`} />
                  </div>
                  <div className="company-details">
                    <h3 className="company-name">{company.name}</h3>
                    <div className="company-rating">
                      <span className="star">★</span>
                      <span className="rating-value">{company.rating}</span>
                      <span className="reviews-count">{company.reviews} reviews</span>
                    </div>
                    <div className="company-tags">
                      <span className="company-tag">{company.type}</span>
                      <span className="company-tag">{company.industry}</span>
                      {company.founded && (
                        <span className="company-tag">Founded: {company.founded}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="view-details">
                  <span className="arrow-right">›</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingDrives;