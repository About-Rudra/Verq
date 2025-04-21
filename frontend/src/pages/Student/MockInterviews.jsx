import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import '../../styles/Student/MockInterviews.css';

const MockInterviews = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`main-content ${darkMode ? 'dark-theme' : ''}`}>
      <div className="breadcrumb-container">
        <div className="breadcrumbs">
          <span>Mock Interviews</span>
        </div>
      </div>
      
      <div className="coming-soon-container">
        <div className={`coming-soon-card ${darkMode ? 'dark' : 'light'}`}>
          <h1>Coming Soon</h1>
          <p>We're working hard to bring you an amazing mock interview experience.</p>
          <div className="progress-container">
            <div className="progress-bar"></div>
          </div>
          <p className="stay-tuned">Stay tuned!</p>
        </div>
      </div>
    </div>
  );
};

export default MockInterviews;