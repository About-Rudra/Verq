import React, { useState, useContext } from "react";
import { 
  FaHome, 
  FaProjectDiagram, 
  FaCalendarAlt,
  FaCode,
  FaMapSigns,
  FaBell,
  FaUserCog,
  FaCog,
  FaMoon,
  FaSun,
  FaSearch,
  FaBuilding,
  FaBookOpen
} from "react-icons/fa";
import 'fa-icons';
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/student/Sidebar.css";

const Sidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className={`sidebar ${darkMode ? "dark" : ""}`}>
      <div className="sidebar-header">
        <h2 className="logo">VerQ</h2>
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
            <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "active" : ""}>
              <FaHome className="icon" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/ongoing-drives" className={({ isActive }) => isActive ? "active" : ""}>
              <FaProjectDiagram className="icon" /> Ongoing Drives
            </NavLink>
          </li>
          <li>
            <NavLink to="/upcoming-drives" className={({ isActive }) => isActive ? "active" : ""}>
              <FaCalendarAlt className="icon" /> Upcoming Drives
            </NavLink>
          </li>
          <li>
            <NavLink to="/tech-directory" className={({ isActive }) => isActive ? "active" : ""}>
              <FaCode className="icon" /> Tech Directory
            </NavLink>
          </li>
          <li>
            <NavLink to="/roadmaps" className={({ isActive }) => isActive ? "active" : ""}>
              <FaMapSigns className="icon" /> Roadmaps
            </NavLink>
          </li>
          <li>
            <NavLink to="/notifications" className={({ isActive }) => isActive ? "active" : ""}>
              <FaBell className="icon" /> Notifications
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
              <FaUserCog className="icon" /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>
              <FaCog className="icon" /> Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="divider"></div>
      
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? (
          <>
            <FaSun className="icon" /> Light Mode
          </>
        ) : (
          <>
            <FaMoon className="icon" /> Dark Mode
          </>
        )}
      </button>
    </div>
  );
};

export default Sidebar;