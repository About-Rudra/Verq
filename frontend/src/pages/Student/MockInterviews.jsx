import React, { useState, useContext, useEffect } from 'react';
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
    </div>
  );
};

export default MockInterviews;