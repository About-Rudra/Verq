import React, { useState } from 'react';

const accomplishmentTypes = [
  'Award', 'Certification', 'Competition', 'Workshop', 
  'Patent', 'Publication', 'Scholarship', 'Other'
];

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const Accomplishments = ({ accomplishments, handleInputChange, addItem, removeItem, onSave }) => {
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
      // Validate all accomplishments
      const validationErrors = accomplishments.map((acc, idx) => {
        const errors = [];
        if (!acc.title) errors.push(`Record ${idx + 1}: Title is required`);
        if (!acc.type) errors.push(`Record ${idx + 1}: Type is required`);
        if (!acc.date) errors.push(`Record ${idx + 1}: Date is required`);
        return errors;
      }).flat();

      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('\n'));
      }

      // Submit each record individually
      const results = await Promise.all(
        accomplishments.map(async (acc) => {
          const requestBody = {
            title: acc.title,
            institution: acc.institution || null,
            type: acc.type,
            description: acc.description || null,
            date: acc.date,
            rank: acc.rank || null
          };

          console.log('Submitting:', requestBody); // Debug log

          const response = await fetch(`${BASE_URL}/api/accomplishment-form`, {
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

      setSuccess(`${results.length} accomplishment records saved successfully!`);
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
      <h2>Accomplishments</h2>
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
        {accomplishments.map((acc, index) => (
          <div key={index} className="repeatable-item">
            <h3>Accomplishment {index + 1}</h3>
            <div className="input-group">
              <label>Title:</label>
              <input
                type="text"
                value={acc.title || ''}
                onChange={(e) => handleInputChange('accomplishments', 'title', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label>Institution (optional):</label>
              <input
                type="text"
                value={acc.institution || ''}
                onChange={(e) => handleInputChange('accomplishments', 'institution', e.target.value, index)}
              />
            </div>
            <div className="input-group">
              <label>Type:</label>
              <select
                value={acc.type || ''}
                onChange={(e) => handleInputChange('accomplishments', 'type', e.target.value, index)}
                required
              >
                <option value="">Select type</option>
                {accomplishmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>Description (optional):</label>
              <textarea
                value={acc.description || ''}
                onChange={(e) => handleInputChange('accomplishments', 'description', e.target.value, index)}
              />
            </div>
            <div className="input-group">
              <label>Date:</label>
              <input
                type="date"
                value={acc.date || ''}
                onChange={(e) => handleInputChange('accomplishments', 'date', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label>Rank (optional):</label>
              <input
                type="text"
                value={acc.rank || ''}
                onChange={(e) => handleInputChange('accomplishments', 'rank', e.target.value, index)}
                placeholder="e.g., 1st, 2nd, Finalist"
              />
            </div>
            {accomplishments.length > 1 && (
              <button 
                type="button" 
                className="remove-button" 
                onClick={() => removeItem('accomplishments', index)}
                disabled={isLoading}
              >
                Remove Accomplishment
              </button>
            )}
          </div>
        ))}
        <div className="button-group">
          <button 
            type="button" 
            className="add-button" 
            onClick={() => addItem('accomplishments')}
            disabled={isLoading}
          >
            Add Another Accomplishment
          </button>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Accomplishments'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Accomplishments;