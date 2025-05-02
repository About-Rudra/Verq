import React, { useState } from 'react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const Competitions = ({ competitions, handleInputChange, addItem, removeItem, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const formatSkills = (skillsString) => {
    if (!skillsString) return null;
    const skillsArray = skillsString.split(',').map(skill => skill.trim());
    return `{${skillsArray.join(', ')}}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate required fields
      const validationErrors = competitions.map((competition, index) => {
        const errors = [];
        if (!competition.name) errors.push(`Record ${index + 1}: Event name is required`);
        if (!competition.date) errors.push(`Record ${index + 1}: Event date is required`);
        if (!competition.role) errors.push(`Record ${index + 1}: Role is required`);
        return errors;
      }).flat();

      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('\n'));
      }

      // Submit each record individually
      const results = await Promise.all(
        competitions.map(async (competition) => {
          const requestBody = {
            event_name: competition.name,
            event_date: competition.date,
            role: competition.role,
            achievement: competition.achievement || null,
            skills: formatSkills(competition.skills)
          };

          console.log('Submitting:', requestBody); // Debug log

          const response = await fetch(`${BASE_URL}/api/competitions-form`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getCookie('token')}`
            },
            credentials: 'include',
            body: JSON.stringify(requestBody)
          });

          const responseData = await response.json();
          console.log('Response:', response.status, responseData); // Debug log

          if (!response.ok) {
            throw new Error(responseData.error || `Failed to save record (Status: ${response.status})`);
          }

          return responseData;
        })
      );

      setSuccess(`${results.length} competition records saved successfully!`);
      if (onSave) {
        onSave();
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-section">
      <h2>Competitions & Events</h2>
      {error && (
        <div className="error-message">
          {error.split('\n').map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}
      {success && <div className="success-message">{success}</div>}
      {isLoading && <div className="loading-indicator">Loading...</div>}

      <form onSubmit={handleSubmit}>
        {competitions.map((competition, index) => (
          <div key={index} className="repeatable-item">
            <h3>Competition/Event {index + 1}</h3>
            <div className="input-group">
              <label>Event Name:</label>
              <input
                type="text"
                value={competition.name || ''}
                onChange={(e) => handleInputChange('competitions', 'name', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label>Date:</label>
              <input
                type="date"
                value={competition.date || ''}
                onChange={(e) => handleInputChange('competitions', 'date', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label>Role/Participation Type:</label>
              <input
                type="text"
                value={competition.role || ''}
                onChange={(e) => handleInputChange('competitions', 'role', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label>Achievement/Outcome:</label>
              <input
                type="text"
                value={competition.achievement || ''}
                onChange={(e) => handleInputChange('competitions', 'achievement', e.target.value, index)}
              />
            </div>
            <div className="input-group">
              <label>Skills Demonstrated (comma separated):</label>
              <input
                type="text"
                value={competition.skills || ''}
                onChange={(e) => handleInputChange('competitions', 'skills', e.target.value, index)}
                placeholder="e.g. JavaScript, React, Teamwork"
              />
              <small>Separate multiple skills with commas</small>
            </div>
            {competitions.length > 1 && (
              <button 
                type="button" 
                className="remove-button" 
                onClick={() => removeItem('competitions', index)}
                disabled={isLoading}
              >
                Remove Competition
              </button>
            )}
          </div>
        ))}
        <div className="button-group">
          <button 
            type="button" 
            className="add-button" 
            onClick={() => addItem('competitions')}
            disabled={isLoading}
          >
            Add Another Competition/Event
          </button>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Competitions'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Competitions;