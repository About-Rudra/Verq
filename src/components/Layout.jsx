import React from 'react';
import Sidebar from './Sidebar'; // Your existing Sidebar component
import '../../styles/student/Dashboard.css'; // Reuse your Dashboard styles

const Layout = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="dashboard-container">
      {/* Sidebar (same as in Dashboard) */}
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      
      {/* Main content area (will inject page content here) */}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;