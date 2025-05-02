import React, { useState } from 'react';

const sectorOptions = [
  'Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 
  'Engineering', 'Retail', 'Manufacturing', 'Media', 'Consulting', 
  'Non-profit', 'Government', 'Other'
];

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const Volunteering = ({ volunteering, handleInputChange, addItem, removeItem, onSave }) => {
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
      const response = await fetch(`${BASE_URL}/api/volunteer-details-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('token')}`
        },
        credentials: 'include',
        body: JSON.stringify({
          volunteering: volunteering.map(volunteer => ({
            organization: volunteer.organization,
            location: volunteer.location,
            sector: volunteer.sector,
            task: volunteer.task,
            start_date: volunteer.startDate,
            end_date: volunteer.endDate
          }))
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to save volunteering information');
      }

      setSuccess('Volunteering information saved successfully');
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
      <h2>Volunteering</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      {isLoading && <div className="loading-indicator">Loading...</div>}

      <form onSubmit={handleSubmit}>
        {volunteering.map((volunteer, index) => (
          <div key={index} className="repeatable-item">
            <h3>Volunteering Experience {index + 1}</h3>
            <div className="input-group">
              <label>Organization:</label>
              <input
                type="text"
                value={volunteer.organization || ''}
                onChange={(e) => handleInputChange('volunteering', 'organization', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label>Location:</label>
              <input
                type="text"
                value={volunteer.location || ''}
                onChange={(e) => handleInputChange('volunteering', 'location', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label>Sector:</label>
              <select
                value={volunteer.sector || ''}
                onChange={(e) => handleInputChange('volunteering', 'sector', e.target.value, index)}
                required
              >
                <option value="">Select sector</option>
                {sectorOptions.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>Task/Description:</label>
              <textarea
                value={volunteer.task || ''}
                onChange={(e) => handleInputChange('volunteering', 'task', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label>Start Date:</label>
              <input
                type="date"
                value={volunteer.startDate || ''}
                onChange={(e) => handleInputChange('volunteering', 'startDate', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label>End Date:</label>
              <input
                type="date"
                value={volunteer.endDate || ''}
                onChange={(e) => handleInputChange('volunteering', 'endDate', e.target.value, index)}
              />
            </div>
            {volunteering.length > 1 && (
              <button 
                type="button" 
                className="remove-button" 
                onClick={() => removeItem('volunteering', index)}
                disabled={isLoading}
              >
                Remove Volunteer Experience
              </button>
            )}
          </div>
        ))}
        <div className="button-group">
          <button 
            type="button" 
            className="add-button" 
            onClick={() => addItem('volunteering')}
            disabled={isLoading}
          >
            Add Another Volunteer Experience
          </button>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Volunteering Information'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Volunteering;