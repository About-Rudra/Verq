import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import '../../styles/Student/ATS.css';

const ATS = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`main-content ${darkMode ? 'dark-theme' : ''}`}>
      <div className="breadcrumb-container">
        <div className="breadcrumbs">
          <span>ATS Checker</span>
        </div>
      </div>
    </div>
  );
};

export default ATS;