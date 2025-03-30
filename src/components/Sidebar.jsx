import React, { useState } from 'react';
import { 
  FaHome, 
  FaCheckCircle, 
  FaSpinner, 
  FaCalendarAlt, 
  FaRoad, 
  FaBuilding, 
  FaFileAlt,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = ({ activeTab, onTabChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme');
  };

  const handleTabClick = (tab) => {
    if (onTabChange) onTabChange(tab);
  };

  return (
    <div className={`sidebar ${darkMode ? 'dark-theme' : ''}`}>
      {/* Logo Header */}
      <div className="sidebar-header">
        <h2 className="logo">VerQ</h2>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
        />
        {searchValue && (
          <button 
            className="clear-search" 
            onClick={clearSearch}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <ul className="menu">
        <li
          className={activeTab === "Dashboard" ? "active" : ""}
          onClick={() => handleTabClick("Dashboard")}
        >
          <FaHome className="icon" /> Dashboard
        </li>
        <li
          className={activeTab === "Completed Drives" ? "active" : ""}
          onClick={() => handleTabClick("Completed Drives")}
        >
          <FaCheckCircle className="icon" /> Completed Drives
        </li>
        <li
          className={activeTab === "Ongoing Drives" ? "active" : ""}
          onClick={() => handleTabClick("Ongoing Drives")}
        >
          <FaSpinner className="icon" /> Ongoing Drives
        </li>
        <li
          className={activeTab === "Upcoming Drives" ? "active" : ""}
          onClick={() => handleTabClick("Upcoming Drives")}
        >
          <FaCalendarAlt className="icon" /> Upcoming Drives
        </li>
        <li
          className={activeTab === "Roadmap" ? "active" : ""}
          onClick={() => handleTabClick("Roadmap")}
        >
          <FaRoad className="icon" /> Roadmap
        </li>
        <li
          className={activeTab === "Companies" ? "active" : ""}
          onClick={() => handleTabClick("Companies")}
        >
          <FaBuilding className="icon" /> Companies
        </li>
        <li
          className={activeTab === "Docs" ? "active" : ""}
          onClick={() => handleTabClick("Docs")}
        >
          <FaFileAlt className="icon" /> Docs
        </li>
      </ul>

      {/* Theme Toggle - Bottom Aligned */}
      <div className="theme-toggle">
        <button onClick={toggleTheme} aria-label="Toggle theme">
          {darkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;