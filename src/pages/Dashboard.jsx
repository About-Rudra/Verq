import React from 'react';
import { Settings, Search, Bell, Clock, Clock11, UserPen, UserPenIcon, Check, FileCode2, UserRoundCheck } from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="container">
      {/* Left Half */}
      <div className="left-half">
        <h1 className="welcome-text">Welcome<br />User</h1>
       
      </div>

      {/* Right Half */}
      <div className="right-half">
        <header className="header">
          <h2 className="header-title">Dashboard</h2>
          <div className="search-container">
            <div className="search-bar">
              <Search size={16} color="#999" />
              <input
                className="search-input"
                type="text"
                placeholder="Search something"
              />
            </div>
            <div className="bell-icon">
              <Bell size={16} />
            </div>
          </div>
        </header>

        <div className="cards-grid">
          {/* Daily Insights Card */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Your Profile</h3>
              <button className="settings-button">
                <UserPen size={25} />
              </button>
              
            </div>
            
            <div className="chart-container">
              <div className="donut-chart">
                <div className="donut-segment-1"></div>
                <div className="donut-segment-2"></div>
                <div className="donut-segment-3"></div>
                <div className="donut-segment-4">
                 
                </div>
              </div>
            </div>
          </div>

          {/* Mood Distribution Card */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Ongoing Drives</h3>
              <button className="settings-button">
                <FileCode2 size={25} />
              </button>
            </div>
            
            <div className="bar-chart">
              <div className="bar" style={{ height: '20%' }}></div>
              <div className="bar" style={{ height: '60%' }}></div>
              <div className="bar active-bar" style={{ height: '100%' }}></div>
              <div className="bar" style={{ height: '60%' }}></div>
              <div className="bar" style={{ height: '40%' }}></div>
            </div>
            <div className="bar-labels">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          {/* Mindful/Relaxation Card */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Participated Drives</h3>
              <button className="settings-button">
                <Check  size={25} />
              </button>
            </div>
            {/* <div className="water-image">
              <img 
                src="/api/placeholder/80/80" 
                alt="Lotus flower" 
                className="flower"
              />
            </div> */}
            {/* <div className="relax-button">
              <button className="relax-button-inner">
                Relaxation Therapy →
              </button>
            </div> */}

            <div className="circle">
                {/* <div className="check"></div> */}
                <UserRoundCheck color="green" style={{marginLeft: '9em', marginTop: '1em'} } size={100}/>
            </div>

          </div>

          {/* Wellness Summary Card */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Upcoming drives</h3>
              <button className="settings-button">
                <Clock size={25} />
              </button>
            </div>
            <div className="wellness-grid">
              <div className="day-box">
                <span className="day-label">MON</span>
                <span className="day-number">14</span>
                <div className="dot-container">
                  <div className="dot pink-dot"></div>
                  <div className="dot purple-dot"></div>
                  <div className="dot pink-dot"></div>
                </div>
              </div>
              <div className="day-box">
                <span className="day-label">TUE</span>
                <span className="day-number">15</span>
                <div className="dot-container">
                  <div className="dot purple-dot"></div>
                  <div className="dot purple-dot"></div>
                  <div className="dot purple-dot"></div>
                </div>
              </div>
              <div className="day-box active-day">
                <span className="day-label active-day-label">WED</span>
                <span className="day-number active-day-number">16</span>
                <div className="dot-container">
                  <div className="dot yellow-dot"></div>
                  <div className="dot yellow-dot"></div>
                  <div className="dot yellow-dot"></div>
                </div>
              </div>
            </div>
            <div className="average-score">
              <div className="big-number">3</div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;