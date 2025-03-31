import React, { useState, useContext } from "react";
import { 
  FaHome, 
  FaProjectDiagram, 
  FaChartLine, 
  FaFileAlt,
  FaPuzzlePiece,
  FaBuilding,
  FaUsers,
  FaQuestionCircle,
  FaBell,
  FaChevronDown
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/student/Sidebar.css";

const Sidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="prody-sidebar">
      <div className="sidebar-header">
        <h2 className="logo">Prody</h2>
      </div>

      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <nav className="main-menu">
        <ul>
          <li>
            <NavLink to="/Dashboard" end className={({ isActive }) => isActive ? "active" : ""}>
              <FaHome className="icon" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/ongoing-drives" className={({ isActive }) => isActive ? "active" : ""}>
              <FaProjectDiagram className="icon" /> OngoingDrives
            </NavLink>
          </li>
          <li>
            <NavLink to="/upcoming-drives" className={({ isActive }) => isActive ? "active" : ""}>
              <FaChartLine className="icon" /> Upcoming Drives
            </NavLink>
          </li>
          <li>
            <NavLink to="/tech-directory" className={({ isActive }) => isActive ? "active" : ""}>
              <FaFileAlt className="icon" /> Tech Directory
            </NavLink>
          </li>
          <li>
            <NavLink to="/extensions" className={({ isActive }) => isActive ? "active" : ""}>
              <FaPuzzlePiece className="icon" /> Extensions
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies" className={({ isActive }) => isActive ? "active" : ""}>
              <FaBuilding className="icon" /> Companies
            </NavLink>
          </li>
          <li>
            <NavLink to="/people" className={({ isActive }) => isActive ? "active" : ""}>
              <FaUsers className="icon" /> People
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="divider"></div>

      <div className="help-section">
        <h3 className="help-title">
          <FaQuestionCircle className="icon" /> Help center
        </h3>
        
        <div className="notification-item">
          <FaBell className="icon" /> Notifications
          <span className="notification-badge">3</span>
        </div>
        
        <div className="project-status">
          <h4>Ember Crest</h4>
          <p>Starter set overview</p>
          <div className="progress-text">3 of 5 projects created</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>

      <div className="upgrade-section">
        <button className="upgrade-button">
          Get full access
        </button>
      </div>
    </div>
  );
};

export default Sidebar;