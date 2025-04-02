import React, { useState, useContext } from "react";
import { 
  FaHome, 
  FaProjectDiagram, 
  FaChartLine, 
  FaFileAlt,
  FaRoad,
  FaBook,
  FaCog,
  FaMoon,
  FaSun
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/student/Sidebar.css";

const Sidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className="sidebar">
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
            <NavLink to="/roadmaps" className={({ isActive }) => isActive ? "active" : ""}>
              <FaRoad className="icon" /> Roadmaps
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies" className={({ isActive }) => isActive ? "active" : ""}>
              <FaBook className="icon" /> Notifications
            </NavLink>
          </li>
          <li>
            <NavLink to="/people" className={({ isActive }) => isActive ? "active" : ""}>
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