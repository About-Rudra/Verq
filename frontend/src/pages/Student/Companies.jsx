import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import '../../styles/Student/Companies.css';

const Companies = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`main-content ${darkMode ? 'dark-theme' : ''}`}>
      <div className="breadcrumb-container">
        <div className="breadcrumbs">
          <span>Companies</span>
        </div>
      </div>
    </div>
  );
};

export default Companies;