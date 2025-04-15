import React, { useState, useContext, useEffect } from 'react';
import { 
  FaLock, 
  FaBell, 
  FaShieldAlt, 
  FaDatabase, 
  FaBriefcase, 
  FaPlug, 
  FaQuestionCircle,
  FaEye,
  FaEyeSlash,
  FaTrash,
  FaDownload,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaGithub,
  FaLinkedin,
  FaGoogle,
  FaEnvelope
} from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import '../../styles/student/Settings.css';

const Settings = () => {
  const { darkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('security');
  const [breadcrumbs, setBreadcrumbs] = useState(['Settings', 'Security']);
  
  // State for various settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [preferredRoles, setPreferredRoles] = useState([]);
  const [githubConnected, setGithubConnected] = useState(false);

  const tabs = [
    { id: 'security', icon: <FaLock />, label: 'Security' },
    { id: 'notifications', icon: <FaBell />, label: 'Notifications' },
    { id: 'privacy', icon: <FaShieldAlt />, label: 'Privacy & Data' },
    { id: 'preferences', icon: <FaBriefcase />, label: 'Company Preferences' },
    { id: 'integrations', icon: <FaPlug />, label: 'Integrations' },
    { id: 'help', icon: <FaQuestionCircle />, label: 'Help & Support' }
  ];

  // Update breadcrumbs when active tab changes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const tabLabel = tabs.find(tab => tab.id === tabId)?.label || '';
    setBreadcrumbs(['Settings', tabLabel]);
  };

  // Initialize breadcrumbs on component mount
  useEffect(() => {
    const tabLabel = tabs.find(tab => tab.id === activeTab)?.label || '';
    setBreadcrumbs(['Settings', tabLabel]);
  }, []);

  return (
    <div className={`settings-page ${darkMode ? 'dark' : ''}`}>
      <div className="settings-header">
        <div className="breadcrumbs">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span>{crumb}</span>
              {index < breadcrumbs.length - 1 && <span>›</span>}
            </React.Fragment>
          ))}
        </div>
        <h1>Settings</h1>
        <p>Manage your account preferences and security</p>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="settings-content">
          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <h2><FaLock /> Security Settings</h2>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Two-Factor Authentication</h3>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={twoFactorAuth}
                    onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Change Password</h3>
                  <p>Update your account password</p>
                </div>
                <button className="action-button">Change Password</button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Active Sessions</h3>
                  <p>View and manage logged-in devices</p>
                </div>
                <button className="action-button">Manage Sessions</button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2><FaBell /> Notification Settings</h2>
              
              <div className="notification-category">
                <h3>Email Notifications</h3>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Drive Announcements</h4>
                    <p>Get notified about new placement drives</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={emailNotifications}
                      onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Application Updates</h4>
                    <p>Receive updates about your applications</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={emailNotifications}
                      onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="notification-category">
                <h3>In-App Notifications</h3>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Enable Notifications</h4>
                    <p>Show notification badges and popups</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={inAppNotifications}
                      onChange={() => setInAppNotifications(!inAppNotifications)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Do Not Disturb</h4>
                    <p>Mute notifications during specific hours</p>
                  </div>
                  <button className="action-button">Set Schedule</button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy & Data Tab */}
          {activeTab === 'privacy' && (
            <div className="settings-section">
              <h2><FaShieldAlt /> Privacy & Data</h2>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Profile Visibility</h3>
                  <p>Control who can see your profile and activity</p>
                </div>
                <select 
                  value={profileVisibility}
                  onChange={(e) => setProfileVisibility(e.target.value)}
                  className="dropdown-select"
                >
                  <option value="public">Public</option>
                  <option value="connections">Only Connections</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Download Your Data</h3>
                  <p>Get a copy of all your data in our system</p>
                </div>
                <button className="action-button">
                  <FaDownload /> Request Data
                </button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Delete Account</h3>
                  <p>Permanently remove your account and all data</p>
                </div>
                <button className="danger-button">
                  <FaTrash /> Delete Account
                </button>
              </div>
            </div>
          )}

          {/* Company Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="settings-section">
              <h2><FaBriefcase /> Company Preferences</h2>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Preferred Job Roles</h3>
                  <p>Get recommendations based on your interests</p>
                </div>
                <div className="tags-input">
                  {['Frontend Developer', 'Backend Engineer', 'Data Scientist'].map(role => (
                    <span key={role} className="tag">
                      {role}
                      <button className="tag-remove">&times;</button>
                    </span>
                  ))}
                  <input type="text" placeholder="Add a role..." />
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Location Preferences</h3>
                  <p>Filter drives by location</p>
                </div>
                <div className="preference-option">
                  <label>
                    <input type="checkbox" checked /> Remote
                  </label>
                  <label>
                    <input type="checkbox" /> On-site
                  </label>
                  <label>
                    <input type="checkbox" /> Hybrid
                  </label>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Salary Expectations</h3>
                  <p>Set your expected salary range (optional)</p>
                </div>
                <div className="range-input">
                  <input type="range" min="0" max="100" />
                  <div className="range-values">
                    <span>$0</span>
                    <span>$100k+</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="settings-section">
              <h2><FaPlug /> Integrations</h2>
              
              <div className="integration-item">
                <div className="integration-info">
                  <FaGithub className="integration-icon" />
                  <div>
                    <h3>GitHub</h3>
                    <p>Showcase your projects and contributions</p>
                  </div>
                </div>
                {githubConnected ? (
                  <button className="connected-button">Connected</button>
                ) : (
                  <button 
                    className="connect-button"
                    onClick={() => setGithubConnected(true)}
                  >
                    Connect
                  </button>
                )}
              </div>

              <div className="integration-item">
                <div className="integration-info">
                  <FaLinkedin className="integration-icon" />
                  <div>
                    <h3>LinkedIn</h3>
                    <p>Import your professional experience</p>
                  </div>
                </div>
                <button className="connect-button">Connect</button>
              </div>

              <div className="integration-item">
                <div className="integration-info">
                  <FaGoogle className="integration-icon" />
                  <div>
                    <h3>Google Calendar</h3>
                    <p>Sync your drive schedules</p>
                  </div>
                </div>
                <button className="connect-button">Connect</button>
              </div>
            </div>
          )}

          {/* Help & Support Tab */}
          {activeTab === 'help' && (
            <div className="settings-section">
              <h2><FaQuestionCircle /> Help & Support</h2>
              
              <div className="help-item">
                <h3>FAQs</h3>
                <p>Find answers to common questions</p>
                <button className="action-button">Browse FAQs</button>
              </div>

              <div className="help-item">
                <h3>Contact Support</h3>
                <p>Get help from our support team</p>
                <button className="action-button">
                  <FaEnvelope /> Send Message
                </button>
              </div>

              <div className="help-item">
                <h3>Report a Bug</h3>
                <p>Found an issue? Let us know</p>
                <button className="action-button">Report</button>
              </div>

              <div className="help-item">
                <h3>Feedback</h3>
                <p>Share your suggestions with us</p>
                <button className="action-button">Give Feedback</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;