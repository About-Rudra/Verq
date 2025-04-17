import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import '../../styles/Student/StudentProfile.css';

const StudentProfile = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [activeTab] = useState("Profile");
  const [breadcrumbs] = useState([activeTab]);
  const { darkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      instituteRollNo: '',
    },
    internships: [{ 
      company: '', 
      position: '', 
      location: '', 
      sector: '', 
      startDate: '', 
      endDate: '', 
      stipend: ''
    }],
    volunteering: [{ 
      organization: '', 
      location: '',
      sector: '',
      task: '', 
      startDate: '', 
      endDate: '' 
    }],
    skills: [{ name: '', proficiency: '' }],
    projects: [{ 
      title: '', 
      description: '', 
      techStack: '', 
      link: '', 
      role: '' 
    }],
    accomplishments: [{ 
      title: '', 
      institution: '',
      type: '',
      description: '', 
      date: '', 
      rank: ''
    }],
    extraCurricular: [{ 
      activity: '', 
      role: '', 
      organization: '', 
      duration: '' 
    }],
    competitions: [{ 
      name: '', 
      date: '', 
      role: '', 
      achievement: '', 
      skills: '' 
    }],
    resume: null
  });

  const handleInputChange = (section, field, value, index = null) => {
    if (index !== null) {
      const newArray = [...formData[section]];
      newArray[index][field] = value;
      setFormData({ ...formData, [section]: newArray });
    } else {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: value }
      });
    }
  };

  const addItem = (section) => {
    const sectionData = [...formData[section]];
    const emptyItem = Object.keys(sectionData[0]).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setFormData({ ...formData, [section]: [...sectionData, emptyItem] });
  };

  const removeItem = (section, index) => {
    const sectionData = [...formData[section]];
    if (sectionData.length > 1) {
      sectionData.splice(index, 1);
      setFormData({ ...formData, [section]: sectionData });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit');
        return;
      }
      // Check file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert('Only PDF, DOC, and DOCX files are allowed');
        return;
      }
      setFormData({
        ...formData,
        resume: file
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Profile updated successfully!');
  };

  const sections = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'internships', label: 'Internships' },
    { id: 'volunteering', label: 'Volunteering' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'accomplishments', label: 'Accomplishments' },
    { id: 'extraCurricular', label: 'Extra-Curricular Activities' },
    { id: 'competitions', label: 'Competitions & Events' },
    { id: 'resume', label: 'Resume Upload' },
  ];

  const sectorOptions = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 
    'Engineering', 'Retail', 'Manufacturing', 'Media', 'Consulting', 
    'Non-profit', 'Government', 'Other'
  ];

  const durationOptions = [
    '< 6 months', '6 months', '1 year', '2 years', '3 years', '4+ years'
  ];

  const accomplishmentTypes = [
    'Award', 'Certification', 'Competition', 'Workshop', 
    'Patent', 'Publication', 'Scholarship', 'Other'
  ];

  const genderOptions = [
    'Male', 'Female', 'Other', 'Prefer not to say'
  ];

  return (
    <div className={`registration-container ${darkMode ? 'dark-theme' : ''}`}>
      <div className="form-navigation">
        {sections.map((section) => (
          <button
            key={section.id}
            className={activeSection === section.id ? 'nav-button active' : 'nav-button'}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        {activeSection === 'personal' && (
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="input-group">
              <label>First Name:</label>
              <input
                type="text"
                value={formData.personal.firstName}
                onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={formData.personal.lastName}
                onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={formData.personal.email}
                onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Phone:</label>
              <input
                type="tel"
                value={formData.personal.phone}
                onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Date of Birth:</label>
              <input
                type="date"
                value={formData.personal.dob}
                onChange={(e) => handleInputChange('personal', 'dob', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Gender:</label>
              <select
                value={formData.personal.gender}
                onChange={(e) => handleInputChange('personal', 'gender', e.target.value)}
              >
                <option value="">Select gender</option>
                {genderOptions.map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>Institute Roll No:</label>
              <input
                type="text"
                value={formData.personal.instituteRollNo}
                onChange={(e) => handleInputChange('personal', 'instituteRollNo', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Internships Section */}
        {activeSection === 'internships' && (
          <div className="form-section">
            <h2>Internships</h2>
            {formData.internships.map((internship, index) => (
              <div key={index} className="repeatable-item">
                <h3>Internship {index + 1}</h3>
                <div className="input-group">
                  <label>Company/Organization:</label>
                  <input
                    type="text"
                    value={internship.company}
                    onChange={(e) => handleInputChange('internships', 'company', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Position:</label>
                  <input
                    type="text"
                    value={internship.position}
                    onChange={(e) => handleInputChange('internships', 'position', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Location:</label>
                  <input
                    type="text"
                    value={internship.location}
                    onChange={(e) => handleInputChange('internships', 'location', e.target.value, index)}
                    placeholder="City, Country"
                  />
                </div>
                <div className="input-group">
                  <label>Sector:</label>
                  <select
                    value={internship.sector}
                    onChange={(e) => handleInputChange('internships', 'sector', e.target.value, index)}
                  >
                    <option value="">Select sector</option>
                    {sectorOptions.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Start Date:</label>
                  <input
                    type="date"
                    value={internship.startDate}
                    onChange={(e) => handleInputChange('internships', 'startDate', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>End Date:</label>
                  <input
                    type="date"
                    value={internship.endDate}
                    onChange={(e) => handleInputChange('internships', 'endDate', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Stipend/Salary:</label>
                  <input
                    type="number"
                    value={internship.stipend}
                    onChange={(e) => handleInputChange('internships', 'stipend', e.target.value, index)}
                    placeholder="Amount per month"
                  />
                </div>
                {formData.internships.length > 1 && (
                  <button type="button" className="remove-button" onClick={() => removeItem('internships', index)}>
                    Remove Internship
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-button" onClick={() => addItem('internships')}>
              Add Another Internship
            </button>
          </div>
        )}

        {/* Volunteering Section */}
        {activeSection === 'volunteering' && (
          <div className="form-section">
            <h2>Volunteering</h2>
            {formData.volunteering.map((volunteer, index) => (
              <div key={index} className="repeatable-item">
                <h3>Volunteering Experience {index + 1}</h3>
                <div className="input-group">
                  <label>Organization:</label>
                  <input
                    type="text"
                    value={volunteer.organization}
                    onChange={(e) => handleInputChange('volunteering', 'organization', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Location:</label>
                  <input
                    type="text"
                    value={volunteer.location}
                    onChange={(e) => handleInputChange('volunteering', 'location', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Sector:</label>
                  <select
                    value={volunteer.sector}
                    onChange={(e) => handleInputChange('volunteering', 'sector', e.target.value, index)}
                  >
                    <option value="">Select sector</option>
                    {sectorOptions.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Task/Description:</label>
                  <textarea
                    value={volunteer.task}
                    onChange={(e) => handleInputChange('volunteering', 'task', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Start Date:</label>
                  <input
                    type="date"
                    value={volunteer.startDate}
                    onChange={(e) => handleInputChange('volunteering', 'startDate', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>End Date:</label>
                  <input
                    type="date"
                    value={volunteer.endDate}
                    onChange={(e) => handleInputChange('volunteering', 'endDate', e.target.value, index)}
                  />
                </div>
                {formData.volunteering.length > 1 && (
                  <button type="button" className="remove-button" onClick={() => removeItem('volunteering', index)}>
                    Remove Volunteer Experience
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-button" onClick={() => addItem('volunteering')}>
              Add Another Volunteer Experience
            </button>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div className="form-section">
            <h2>Skills</h2>
            {formData.skills.map((skill, index) => (
              <div key={index} className="repeatable-item">
                <h3>Skill {index + 1}</h3>
                <div className="input-group">
                  <label>Skill Name:</label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleInputChange('skills', 'name', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Proficiency:</label>
                  <select
                    value={skill.proficiency}
                    onChange={(e) => handleInputChange('skills', 'proficiency', e.target.value, index)}
                  >
                    <option value="">Select proficiency level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                {formData.skills.length > 1 && (
                  <button type="button" className="remove-button" onClick={() => removeItem('skills', index)}>
                    Remove Skill
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-button" onClick={() => addItem('skills')}>
              Add Another Skill
            </button>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <div className="form-section">
            <h2>Projects</h2>
            {formData.projects.map((project, index) => (
              <div key={index} className="repeatable-item">
                <h3>Project {index + 1}</h3>
                <div className="input-group">
                  <label>Project Title:</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => handleInputChange('projects', 'title', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Description:</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Tech Stack:</label>
                  <input
                    type="text"
                    value={project.techStack}
                    onChange={(e) => handleInputChange('projects', 'techStack', e.target.value, index)}
                    placeholder="Technologies used"
                  />
                </div>
                <div className="input-group">
                  <label>Project Link:</label>
                  <input
                    type="url"
                    value={project.link}
                    onChange={(e) => handleInputChange('projects', 'link', e.target.value, index)}
                    placeholder="GitHub, Live Demo, etc."
                  />
                </div>
                <div className="input-group">
                  <label>Your Role:</label>
                  <input
                    type="text"
                    value={project.role}
                    onChange={(e) => handleInputChange('projects', 'role', e.target.value, index)}
                  />
                </div>
                {formData.projects.length > 1 && (
                  <button type="button" className="remove-button" onClick={() => removeItem('projects', index)}>
                    Remove Project
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-button" onClick={() => addItem('projects')}>
              Add Another Project
            </button>
          </div>
        )}

        {/* Accomplishments Section */}
        {activeSection === 'accomplishments' && (
          <div className="form-section">
            <h2>Accomplishments</h2>
            {formData.accomplishments.map((accomplishment, index) => (
              <div key={index} className="repeatable-item">
                <h3>Accomplishment {index + 1}</h3>
                <div className="input-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    value={accomplishment.title}
                    onChange={(e) => handleInputChange('accomplishments', 'title', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Institution:</label>
                  <input
                    type="text"
                    value={accomplishment.institution}
                    onChange={(e) => handleInputChange('accomplishments', 'institution', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Type:</label>
                  <select
                    value={accomplishment.type}
                    onChange={(e) => handleInputChange('accomplishments', 'type', e.target.value, index)}
                  >
                    <option value="">Select type</option>
                    {accomplishmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Description:</label>
                  <textarea
                    value={accomplishment.description}
                    onChange={(e) => handleInputChange('accomplishments', 'description', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Date:</label>
                  <input
                    type="date"
                    value={accomplishment.date}
                    onChange={(e) => handleInputChange('accomplishments', 'date', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Rank (if applicable):</label>
                  <input
                    type="text"
                    value={accomplishment.rank}
                    onChange={(e) => handleInputChange('accomplishments', 'rank', e.target.value, index)}
                    placeholder="e.g., 1st, 2nd, Finalist"
                  />
                </div>
                {formData.accomplishments.length > 1 && (
                  <button type="button" className="remove-button" onClick={() => removeItem('accomplishments', index)}>
                    Remove Accomplishment
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-button" onClick={() => addItem('accomplishments')}>
              Add Another Accomplishment
            </button>
          </div>
        )}

        {/* Extra-Curricular Activities Section */}
        {activeSection === 'extraCurricular' && (
          <div className="form-section">
            <h2>Extra-Curricular Activities</h2>
            {formData.extraCurricular.map((activity, index) => (
              <div key={index} className="repeatable-item">
                <h3>Activity {index + 1}</h3>
                <div className="input-group">
                  <label>Activity Name:</label>
                  <input
                    type="text"
                    value={activity.activity}
                    onChange={(e) => handleInputChange('extraCurricular', 'activity', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Role/Position:</label>
                  <input
                    type="text"
                    value={activity.role}
                    onChange={(e) => handleInputChange('extraCurricular', 'role', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Club/Organization:</label>
                  <input
                    type="text"
                    value={activity.organization}
                    onChange={(e) => handleInputChange('extraCurricular', 'organization', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Duration:</label>
                  <select
                    value={activity.duration}
                    onChange={(e) => handleInputChange('extraCurricular', 'duration', e.target.value, index)}
                  >
                    <option value="">Select duration</option>
                    {durationOptions.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
                {formData.extraCurricular.length > 1 && (
                  <button type="button" className="remove-button" onClick={() => removeItem('extraCurricular', index)}>
                    Remove Activity
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-button" onClick={() => addItem('extraCurricular')}>
              Add Another Activity
            </button>
          </div>
        )}

        {/* Competitions & Events Section */}
        {activeSection === 'competitions' && (
          <div className="form-section">
            <h2>Competitions & Events</h2>
            {formData.competitions.map((competition, index) => (
              <div key={index} className="repeatable-item">
                <h3>Competition/Event {index + 1}</h3>
                <div className="input-group">
                  <label>Event Name:</label>
                  <input
                    type="text"
                    value={competition.name}
                    onChange={(e) => handleInputChange('competitions', 'name', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Date:</label>
                  <input
                    type="date"
                    value={competition.date}
                    onChange={(e) => handleInputChange('competitions', 'date', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Role/Participation Type:</label>
                  <input
                    type="text"
                    value={competition.role}
                    onChange={(e) => handleInputChange('competitions', 'role', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Achievement/Outcome:</label>
                  <input
                    type="text"
                    value={competition.achievement}
                    onChange={(e) => handleInputChange('competitions', 'achievement', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Skills Demonstrated:</label>
                  <input
                    type="text"
                    value={competition.skills}
                    onChange={(e) => handleInputChange('competitions', 'skills', e.target.value, index)}
                  />
                </div>
                {formData.competitions.length > 1 && (
                  <button type="button" className="remove-button" onClick={() => removeItem('competitions', index)}>
                    Remove Competition
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-button" onClick={() => addItem('competitions')}>
              Add Another Competition/Event
            </button>
          </div>
        )}

        {/* Resume Upload Section */}
        {activeSection === 'resume' && (
          <div className="form-section">
            <h2>Resume Upload</h2>
            <div className="input-group">
              <label className="file-upload-label">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="file-upload-input"
                />
                <div className="file-upload-button">
                  {formData.resume ? 'Change Resume' : 'Upload Resume'}
                </div>
                {formData.resume && (
                  <div className="file-info-display">
                    <span className="file-name">{formData.resume.name}</span>
                    <span className="file-size">
                      {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                )}
                <p className="file-info">Accepted formats: PDF, DOC, DOCX. Maximum size: 5MB</p>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          {sections.findIndex(section => section.id === activeSection) > 0 && (
            <button
              type="button"
              onClick={() => {
                const currentIndex = sections.findIndex(section => section.id === activeSection);
                setActiveSection(sections[currentIndex - 1].id);
              }}
            >
              Previous
            </button>
          )}
          
          {sections.findIndex(section => section.id === activeSection) < sections.length - 1 ? (
            <button
              type="button"
              onClick={() => {
                const currentIndex = sections.findIndex(section => section.id === activeSection);
                setActiveSection(sections[currentIndex + 1].id);
              }}
            >
              Next
            </button>
          ) : (
            <button type="submit">
              Submit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;