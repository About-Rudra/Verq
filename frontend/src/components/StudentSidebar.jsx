import React, { useState, useContext } from "react";
import { 
  FaThLarge,
  FaMapSigns,
  FaTasks,
  FaCalendarCheck,
  FaClipboardCheck,
  FaBell,
  FaUserAlt,
  FaCog,
  FaSun,
  FaMoon,
  FaBuilding,
  FaBookOpen,
  FaGift,
  FaLaptop,
  FaFileAlt,
  FaUsers,
  FaMicrophone,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/student/StudentSidebar.css";

const StudentSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className={`sidebar ${darkMode ? "dark" : ""}`}>
      <div className="sidebar-header">
        <h2 className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>VerQ</h2>
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
            <NavLink to="/student-dashboard" end className={({ isActive }) => isActive ? "active" : ""}>
              <FaThLarge className="icon" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/student-profile" className={({ isActive }) => isActive ? "active" : ""}>
              <FaUserAlt className="icon" /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/roadmaps" className={({ isActive }) => isActive ? "active" : ""}>
              <FaMapSigns className="icon" /> Roadmaps
            </NavLink>
          </li>
          <li>
            <NavLink to="/ongoing-drives" className={({ isActive }) => isActive ? "active" : ""}>
              <FaTasks className="icon" /> Ongoing Drives
            </NavLink>
          </li>
          <li>
            <NavLink to="/upcoming-drives" className={({ isActive }) => isActive ? "active" : ""}>
              <FaCalendarCheck className="icon" /> Upcoming Drives
            </NavLink>
          </li>
          <li>
            <NavLink to="/participated-drives" className={({ isActive }) => isActive ? "active" : ""}>
              <FaClipboardCheck className="icon" /> Participated Drives
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies" className={({ isActive }) => isActive ? "active" : ""}>
              <FaBuilding className="icon" /> Companies
            </NavLink>
          </li>
          <li>
            <NavLink to="/resources" className={({ isActive }) => isActive ? "active" : ""}>
              <FaBookOpen className="icon" /> Resources
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => isActive ? "active" : ""}>
              <FaLaptop className="icon" /> Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/ats-checker" className={({ isActive }) => isActive ? "active" : ""}>
              <FaFileAlt className="icon" /> ATS Checker
            </NavLink>
          </li>
          <li>
            <NavLink to="/mock-interviews" className={({ isActive }) => isActive ? "active" : ""}>
              <FaMicrophone className="icon" /> Mock Interviews
            </NavLink>
          </li>
          <li>
            <NavLink to="/student-perks" className={({ isActive }) => isActive ? "active" : ""}>
              <FaGift className="icon" /> Student Perks
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>
              <FaCog className="icon" /> Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/notifications" className={({ isActive }) => isActive ? "active" : ""}>
              <FaBell className="icon" /> Notifications
            </NavLink>
          </li>
          <li>
            <NavLink to="/forum" className={({ isActive }) => isActive ? "active" : ""}>
              <FaUsers className="icon" /> Discussion Forum
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

export default StudentSidebar;