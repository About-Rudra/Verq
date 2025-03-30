import React, { useState, useContext } from "react";
import { 
  FaHome, 
  FaCheckCircle, 
  FaSpinner, 
  FaCalendarAlt, 
  FaRoad, 
  FaBuilding, 
  FaFileAlt,
  FaSearch,
  FaMoon,
  FaSun
} from "react-icons/fa";
import "../styles/student/Sidebar.css";

// Theme context (you would implement this)
const ThemeContext = React.createContext({
  darkMode: false,
  toggleTheme: () => {}
});

const Sidebar = ({ activeTab, onTabChange }) => {
  // Use the activeTab prop from Dashboard if available, otherwise use local state
  const [localActiveTab, setLocalActiveTab] = useState("Dashboard");
  const currentActiveTab = activeTab || localActiveTab;
  
  const [searchValue, setSearchValue] = useState("");
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchValue("");
  };
  
  // Handle tab click
  const handleTabClick = (tab) => {
    if (onTabChange) {
      // If parent component provided a handler, use it
      onTabChange(tab);
    } else {
      // Otherwise use local state
      setLocalActiveTab(tab);
    }
  };

  return (
    <div className={`sidebar ${darkMode ? 'dark-theme' : ''}`}>
      <div className="sidebar-header">
        <h2 className="logo">VerQ</h2>
      </div>

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
            onClick={handleSearchClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <ul className="menu">
        <li
          className={currentActiveTab === "Dashboard" ? "active" : ""}
          onClick={() => handleTabClick("Dashboard")}
        >
          <FaHome className="icon" /> Dashboard
        </li>
        <li
          className={currentActiveTab === "Completed Drives" ? "active" : ""}
          onClick={() => handleTabClick("Completed Drives")}
        >
          <FaCheckCircle className="icon" /> Completed Drives
        </li>
        <li
          className={currentActiveTab === "Ongoing Drives" ? "active" : ""}
          onClick={() => handleTabClick("Ongoing Drives")}
        >
          <FaSpinner className="icon" /> Ongoing Drives
        </li>
        <li
          className={currentActiveTab === "Upcoming Drives" ? "active" : ""}
          onClick={() => handleTabClick("Upcoming Drives")}
        >
          <FaCalendarAlt className="icon" /> Upcoming Drives
        </li>
        <li
          className={currentActiveTab === "Roadmap" ? "active" : ""}
          onClick={() => handleTabClick("Roadmap")}
        >
          <FaRoad className="icon" /> Roadmap
        </li>
        <li
          className={currentActiveTab === "Companies" ? "active" : ""}
          onClick={() => handleTabClick("Companies")}
        >
          <FaBuilding className="icon" /> Companies
        </li>
        <li
          className={currentActiveTab === "Docs" ? "active" : ""}
          onClick={() => handleTabClick("Docs")}
        >
          <FaFileAlt className="icon" /> Docs
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;