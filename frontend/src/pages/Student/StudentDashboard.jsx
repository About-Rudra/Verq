import React from "react";
import { useState, useEffect } from 'react';
import "../../styles/Student/StudentDashboard.css";
import axios from 'axios'; // Ensure axios is installed: npm install axios

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState(null); // Initialize with null
  const [activeSection, setActiveSection] = useState('overview');
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/personal-information');
        setStudentData(response.data); // Update state with fetched data
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProficiencyColor = (proficiency) => {
    switch(proficiency) {
      case 'Beginner': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-green-100 text-green-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="profile-section">
          <div className="profile-image-container">
            <img src={studentData.profilePicture || '/api/placeholder/150/150'} alt="Profile" className="profile-image" />
          </div>
          <div className="profile-info">
            <h1>{studentData.personal.firstName} {studentData.personal.lastName}</h1>
            <p className="text-lg text-blue-600">{studentData.personal.instituteRollNo}</p>
            <div className="contact-info">
              <span>{studentData.personal.email}</span>
              <span>{studentData.personal.phone}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <ul className="section-tabs">
          <li className={activeSection === 'overview' ? 'active' : ''} onClick={() => setActiveSection('overview')}>Overview</li>
          <li className={activeSection === 'academic' ? 'active' : ''} onClick={() => setActiveSection('academic')}>Academic</li>
          <li className={activeSection === 'experience' ? 'active' : ''} onClick={() => setActiveSection('experience')}>Experience</li>
          <li className={activeSection === 'skills' ? 'active' : ''} onClick={() => setActiveSection('skills')}>Skills</li>
          <li className={activeSection === 'activities' ? 'active' : ''} onClick={() => setActiveSection('activities')}>Activities</li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        {activeSection === 'overview' && (
          <section className="overview-section">
            <h2>Personal Information</h2>
            <div className="personal-details">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">{studentData.personal.firstName} {studentData.personal.lastName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Roll Number</span>
                  <span className="detail-value">{studentData.personal.instituteRollNo}</span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{studentData.personal.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{studentData.personal.phone}</span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Date of Birth</span>
                  <span className="detail-value">{formatDate(studentData.personal.dob)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Gender</span>
                  <span className="detail-value">{studentData.personal.gender}</span>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* Other sections remain unchanged */}
{activeSection === 'academic' && (
  <section className="academic-section">
    <h2>Academic Achievements</h2>
    <div className="achievements-list">
      {studentData.accomplishments.filter(a => a.type === 'Academic').length > 0 ? (
        studentData.accomplishments.filter(a => a.type === 'Academic').map((accom, index) => (
          <div key={index} className="achievement-item">
            <div className="achievement-header">
              <h3>{accom.title}</h3>
              <span className="achievement-date">{formatDate(accom.date)}</span>
            </div>
            <div className="achievement-institution">{accom.institution}</div>
            <p className="achievement-description">{accom.description}</p>
            {accom.rank && <div className="achievement-rank">Rank: {accom.rank}</div>}
          </div>
        ))
      ) : (
        <p className="no-data-message">No academic achievements added yet.</p>
      )}
    </div>

    <h2>Projects</h2>
    <div className="projects-list">
      {studentData.projects.length > 0 ? (
        studentData.projects.map((project, index) => (
          <div key={index} className="project-item">
            <div className="project-header">
              <h3>{project.title}</h3>
              <span className="project-role">{project.role}</span>
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-details">
              <div className="tech-stack">
                <span className="detail-label">Tech Stack:</span>
                <span className="detail-value">{project.techStack}</span>
              </div>
              {project.link && (
                <div className="project-link">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="no-data-message">No projects added yet.</p>
      )}
    </div>
  </section>
)}

{activeSection === 'experience' && (
  <section className="experience-section">
    <h2>Internships</h2>
    <div className="experience-timeline">
      {studentData.internships.length > 0 ? (
        studentData.internships.map((intern, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="experience-header">
                <h3>{intern.position}</h3>
                <div className="experience-duration">
                  {formatDate(intern.startDate)} - {intern.endDate ? formatDate(intern.endDate) : 'Present'}
                </div>
              </div>
              <div className="experience-company">
                <span>{intern.company}</span>
                <span className="experience-location">{intern.location}</span>
              </div>
              <div className="experience-details">
                <div className="experience-sector">
                  <span className="detail-label">Sector:</span>
                  <span className="detail-value">{intern.sector}</span>
                </div>
                {intern.stipend && (
                  <div className="experience-stipend">
                    <span className="detail-label">Stipend:</span>
                    <span className="detail-value">{intern.stipend}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="no-data-message">No internships added yet.</p>
      )}
    </div>

    <h2>Volunteering</h2>
    <div className="experience-timeline">
      {studentData.volunteering.length > 0 ? (
        studentData.volunteering.map((vol, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker volunteer-marker"></div>
            <div className="timeline-content">
              <div className="experience-header">
                <h3>{vol.organization}</h3>
                <div className="experience-duration">
                  {formatDate(vol.startDate)} - {vol.endDate ? formatDate(vol.endDate) : 'Present'}
                </div>
              </div>
              <div className="experience-company">
                <span>{vol.location}</span>
                <span className="experience-sector">{vol.sector}</span>
              </div>
              <p className="volunteer-task">{vol.task}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-data-message">No volunteering experience added yet.</p>
      )}
    </div>
  </section>
)}

{activeSection === 'skills' && (
  <section className="skills-section">
    <h2>Technical & Soft Skills</h2>
    <div className="skills-container">
      {studentData.skills.length > 0 ? (
        <div className="skills-grid">
          {studentData.skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-name">{skill.name}</div>
              <div className="skill-proficiency-bar">
                <div 
                  className={`proficiency-level ${skill.proficiency.toLowerCase()}`} 
                  style={{ 
                    width: skill.proficiency === 'Beginner' ? '33%' : 
                          skill.proficiency === 'Intermediate' ? '66%' : '100%' 
                  }}
                ></div>
              </div>
              <div className="proficiency-label">{skill.proficiency}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data-message">No skills added yet.</p>
      )}
    </div>

    <h2>Competitions</h2>
    <div className="competitions-list">
      {studentData.competitions.length > 0 ? (
        studentData.competitions.map((comp, index) => (
          <div key={index} className="competition-item">
            <div className="competition-header">
              <h3>{comp.name}</h3>
              <span className="competition-date">{formatDate(comp.date)}</span>
            </div>
            <div className="competition-role-achievement">
              <span className="competition-role">{comp.role}</span>
              {comp.achievement && <span className="competition-achievement">{comp.achievement}</span>}
            </div>
            <div className="competition-skills">
              <span className="detail-label">Skills Demonstrated:</span>
              <div className="skills-tags">
                {comp.skills.split(',').map((skill, i) => (
                  <span key={i} className="skill-tag">{skill.trim()}</span>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="no-data-message">No competitions added yet.</p>
      )}
    </div>
  </section>
)}

{activeSection === 'activities' && (
  <section className="activities-section">
    <h2>Extracurricular Activities</h2>
    <div className="activities-list">
      {studentData.extraCurricular.length > 0 ? (
        studentData.extraCurricular.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-header">
              <h3>{activity.activity}</h3>
              <span className="activity-duration">{activity.duration}</span>
            </div>
            <div className="activity-details">
              <span className="activity-role">{activity.role}</span>
              <span className="activity-organization">{activity.organization}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="no-data-message">No extracurricular activities added yet.</p>
      )}
    </div>

    <h2>Other Accomplishments</h2>
    <div className="other-accomplishments">
      {studentData.accomplishments.filter(a => a.type !== 'Academic').length > 0 ? (
        studentData.accomplishments.filter(a => a.type !== 'Academic').map((accom, index) => (
          <div key={index} className="accomplishment-item">
            <div className="accomplishment-header">
              <h3>{accom.title}</h3>
              <span className="accomplishment-date">{formatDate(accom.date)}</span>
            </div>
            <div className="accomplishment-institution">{accom.institution}</div>
            <div className="accomplishment-type">{accom.type}</div>
            <p className="accomplishment-description">{accom.description}</p>
            {accom.rank && <div className="accomplishment-rank">Rank: {accom.rank}</div>}
          </div>
        ))
      ) : (
        <p className="no-data-message">No other accomplishments added yet.</p>
      )}
    </div>
  </section>
)}
      </main>
    </div>
  );
}