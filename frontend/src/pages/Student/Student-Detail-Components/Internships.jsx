import React, { useState } from 'react';

const sectorOptions = [
  'Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 
  'Engineering', 'Retail', 'Manufacturing', 'Media', 'Consulting', 
  'Non-profit', 'Government', 'Other'
];

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const Internships = ({ internships, handleInputChange, addItem, removeItem, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${BASE_URL}/api/internship-details-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('token')}`
        },
        credentials: 'include',
        body: JSON.stringify({
          internships: internships.map(internship => ({
            company: internship.company,
            position: internship.position,
            location: internship.location,
            sector: internship.sector,
            start_date: internship.startDate,
            end_date: internship.endDate,
            stipend: internship.stipend
          }))
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to save internships');
      }

      setSuccess('Internships saved successfully');
      if (onSave) {
        onSave();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-section">
      <h2>Internships</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      {isLoading && <div className="loading-indicator">Loading...</div>}

      <form onSubmit={handleSubmit}>
        {internships.map((internship, index) => (
          <div key={index} className="repeatable-item">
            <h3>Internship {index + 1}</h3>
            <div className="input-group">
              <label>Company/Organization:</label>
              <input
                type="text"
                value={internship.company || ''}
                onChange={(e) => handleInputChange('internships', 'company', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label>Position:</label>
              <input
                type="text"
                value={internship.position || ''}
                onChange={(e) => handleInputChange('internships', 'position', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label>Location:</label>
              <input
                type="text"
                value={internship.location || ''}
                onChange={(e) => handleInputChange('internships', 'location', e.target.value, index)}
                placeholder="City, Country"
                required
              />
            </div>
            <div className="input-group">
              <label>Sector:</label>
              <select
                value={internship.sector || ''}
                onChange={(e) => handleInputChange('internships', 'sector', e.target.value, index)}
                required
              >
                <option value="">Select sector</option>
                {sectorOptions.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>Start Date:</label>
              <input
                type="date"
                value={internship.startDate || ''}
                onChange={(e) => handleInputChange('internships', 'startDate', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label>End Date:</label>
              <input
                type="date"
                value={internship.endDate || ''}
                onChange={(e) => handleInputChange('internships', 'endDate', e.target.value, index)}
              />
            </div>
            <div className="input-group">
              <label>Stipend/Salary:</label>
              <input
                type="number"
                value={internship.stipend || ''}
                onChange={(e) => handleInputChange('internships', 'stipend', e.target.value, index)}
                placeholder="Amount per month"
              />
            </div>
            {internships.length > 1 && (
              <button 
                type="button" 
                className="remove-button" 
                onClick={() => removeItem('internships', index)}
                disabled={isLoading}
              >
                Remove Internship
              </button>
            )}
          </div>
        ))}
        <div className="button-group">
          <button 
            type="button" 
            className="add-button" 
            onClick={() => addItem('internships')}
            disabled={isLoading}
          >
            Add Another Internship
          </button>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Internships'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Internships;