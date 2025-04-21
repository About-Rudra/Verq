import React, { useState, useContext, useEffect } from "react";
import { 
  FaThLarge,
  FaMapSigns,
  FaTasks,
  FaCalendarCheck,
  FaClipboardCheck,
  FaBell,
  FaCog,
  FaSun,
  FaMoon,
  FaBuilding,
  FaGift,
  FaLaptop,
  FaFileAlt,
  FaUsers,
  FaMicrophone
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/Student/StudentSidebar.css";

const StudentSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/default");
  };

  // Helper function to determine if a route is active
  const isActiveRoute = ({ isActive }) => isActive ? "active" : "";

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial state based on window size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`sidebar ${darkMode ? "dark" : ""} ${isMobile ? "mobile" : ""}`}>
      <div className="sidebar-header">
        {!isMobile ? (
          <h2 className="logo" onClick={handleLogoClick}>VerQ</h2>
        ) : (
          <div className="logo-icon" onClick={handleLogoClick}>V</div>
        )}
      </div>
      
      {!isMobile && (
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      )}

      <nav className="main-menu">
        <ul>
          <li>
            <NavLink to="/student-dashboard" className={isActiveRoute} title="Dashboard">
              <FaThLarge className="icon" /> 
              {!isMobile && <span className="menu-text">Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/roadmaps" className={isActiveRoute} title="Roadmaps">
              <FaMapSigns className="icon" /> 
              {!isMobile && <span className="menu-text">Roadmaps</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/ongoing-drives" className={isActiveRoute} title="Ongoing Drives">
              <FaTasks className="icon" /> 
              {!isMobile && <span className="menu-text">Ongoing Drives</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/upcoming-drives" className={isActiveRoute} title="Upcoming Drives">
              <FaCalendarCheck className="icon" /> 
              {!isMobile && <span className="menu-text">Upcoming Drives</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/participated-drives" className={isActiveRoute} title="Participated Drives">
              <FaClipboardCheck className="icon" /> 
              {!isMobile && <span className="menu-text">Participated Drives</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies" className={isActiveRoute} title="Companies">
              <FaBuilding className="icon" /> 
              {!isMobile && <span className="menu-text">Companies</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={isActiveRoute} title="Projects">
              <FaLaptop className="icon" /> 
              {!isMobile && <span className="menu-text">Projects</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/forum" className={isActiveRoute} title="Discussion Forum">
              <FaUsers className="icon" /> 
              {!isMobile && <span className="menu-text">Discussion Forum</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/ats-checker" className={isActiveRoute} title="ATS Checker">
              <FaFileAlt className="icon" /> 
              {!isMobile && <span className="menu-text">ATS Checker</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/mock-interviews" className={isActiveRoute} title="Mock Interviews">
              <FaMicrophone className="icon" /> 
              {!isMobile && <span className="menu-text">Mock Interviews</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/student-perks" className={isActiveRoute} title="Student Perks">
              <FaGift className="icon" /> 
              {!isMobile && <span className="menu-text">Student Perks</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/notifications" className={isActiveRoute} title="Notifications">
              <FaBell className="icon" /> 
              {!isMobile && <span className="menu-text">Notifications</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={isActiveRoute} title="Settings">
              <FaCog className="icon" /> 
              {!isMobile && <span className="menu-text">Settings</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="divider"></div>
      
      <button className="theme-toggle" onClick={toggleDarkMode} title={darkMode ? "Light Mode" : "Dark Mode"}>
        {darkMode ? (
          <>
            <FaSun className="icon" /> 
            {!isMobile && <span>Light Mode</span>}
          </>
        ) : (
          <>
            <FaMoon className="icon" /> 
            {!isMobile && <span>Dark Mode</span>}
          </>
        )}
      </button>
    </div>
  );
};

export default StudentSidebar;