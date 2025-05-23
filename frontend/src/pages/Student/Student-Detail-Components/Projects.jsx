import React, { useState } from 'react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const Projects = ({ projects, handleInputChange, addItem, removeItem, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const formatTechStack = (techString) => {
    if (!techString) return null;
    const techArray = techString.split(',').map(tech => tech.trim());
    return `{${techArray.join(', ')}}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate all records
      const validationErrors = projects.map((project, index) => {
        const errors = [];
        if (!project.title) errors.push(`Record ${index + 1}: Project title is required`);
        if (!project.description) errors.push(`Record ${index + 1}: Description is required`);
        if (!project.role) errors.push(`Record ${index + 1}: Role is required`);
        return errors;
      }).flat();

      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('\n'));
      }

      // Submit data
      const response = await fetch(`${BASE_URL}/api/projects-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('token')}`
        },
        credentials: 'include',
        body: JSON.stringify({
          projects: projects.map(project => ({
            title: project.title,
            description: project.description,
            tech_stack: formatTechStack(project.techStack),
            link: project.link || null,
            role: project.role
          }))
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to save projects');
      }

      setSuccess('Projects saved successfully');
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
      <h2>Projects</h2>
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
        {projects.map((project, index) => (
          <div key={index} className="repeatable-item">
            <h3>Project {index + 1}</h3>
            <div className="input-group">
              <label>Project Title:</label>
              <input
                type="text"
                value={project.title || ''}
                onChange={(e) => handleInputChange('projects', 'title', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label>Description:</label>
              <textarea
                value={project.description || ''}
                onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label>Tech Stack (comma separated):</label>
              <input
                type="text"
                value={project.techStack || ''}
                onChange={(e) => handleInputChange('projects', 'techStack', e.target.value, index)}
                placeholder="JavaScript, React, Node.js"
              />
            </div>
            <div className="input-group">
              <label>Project Link (optional):</label>
              <input
                type="url"
                value={project.link || ''}
                onChange={(e) => handleInputChange('projects', 'link', e.target.value, index)}
                placeholder="https://"
              />
            </div>
            <div className="input-group">
              <label>Your Role:</label>
              <input
                type="text"
                value={project.role || ''}
                onChange={(e) => handleInputChange('projects', 'role', e.target.value, index)}
                required
              />
            </div>
            {projects.length > 1 && (
              <button 
                type="button" 
                className="remove-button" 
                onClick={() => removeItem('projects', index)}
                disabled={isLoading}
              >
                Remove Project
              </button>
            )}
          </div>
        ))}
        <div className="button-group">
          <button 
            type="button" 
            className="add-button" 
            onClick={() => addItem('projects')}
            disabled={isLoading}
          >
            Add Another Project
          </button>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Projects'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Projects;