import React, { useState } from 'react';
import '../../styles/student/Form.css';


const Form = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [formData, setFormData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      address: '',
    },
    internships: [{ company: '', position: '', startDate: '', endDate: '', description: '', supervisor: '' }],
    volunteering: [{ organization: '', role: '', startDate: '', endDate: '', hours: '', description: '' }],
    skills: [{ name: '', category: '', proficiency: '' }],
    projects: [{ title: '', duration: '', technologies: '', role: '', outcome: '', link: '' }],
    accomplishments: [{ title: '', description: '', date: '' }],
    extraCurricular: [{ activity: '', role: '', organization: '', duration: '' }],
    resume: null,
    jobSearch: {
      industries: [],
      roles: [],
      locations: [],
      workArrangement: '',
      availability: '',
    },
    competitions: [{ name: '', date: '', role: '', achievement: '', skills: '' }],
    settings: {
      notifications: true,
      profileVisibility: 'public',
      marketingEmails: false,
    }
  });

  const handleInputChange = (section, field, value, index = null) => {
    if (index !== null) {
      // For array fields
      const newArray = [...formData[section]];
      newArray[index][field] = value;
      setFormData({ ...formData, [section]: newArray });
    } else {
      // For object fields
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
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Registration submitted successfully!');
  };

  // Array of form sections for navigation
  const sections = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'internships', label: 'Internships' },
    { id: 'volunteering', label: 'Volunteering' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'accomplishments', label: 'Accomplishments' },
    { id: 'extraCurricular', label: 'Extra-Curricular Activities' },
    { id: 'resume', label: 'Resume Upload' },
    { id: 'jobSearch', label: 'Job & Internship Search' },
    { id: 'competitions', label: 'Competitions & Events' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="registration-container">
      <h1>Student Registration Form</h1>

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
              <label>Address:</label>
              <textarea
                value={formData.personal.address}
                onChange={(e) => handleInputChange('personal', 'address', e.target.value)}
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
                  <label>Description of Responsibilities:</label>
                  <textarea
                    value={internship.description}
                    onChange={(e) => handleInputChange('internships', 'description', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Supervisor Contact:</label>
                  <input
                    type="text"
                    value={internship.supervisor}
                    onChange={(e) => handleInputChange('internships', 'supervisor', e.target.value, index)}
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
                  <label>Role:</label>
                  <input
                    type="text"
                    value={volunteer.role}
                    onChange={(e) => handleInputChange('volunteering', 'role', e.target.value, index)}
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
                <div className="input-group">
                  <label>Hours Contributed:</label>
                  <input
                    type="number"
                    value={volunteer.hours}
                    onChange={(e) => handleInputChange('volunteering', 'hours', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Description of Activities:</label>
                  <textarea
                    value={volunteer.description}
                    onChange={(e) => handleInputChange('volunteering', 'description', e.target.value, index)}
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
                  <label>Category:</label>
                  <select
                    value={skill.category}
                    onChange={(e) => handleInputChange('skills', 'category', e.target.value, index)}
                  >
                    <option value="">Select a category</option>
                    <option value="technical">Technical</option>
                    <option value="soft">Soft Skills</option>
                    <option value="language">Language</option>
                    <option value="certification">Certification</option>
                    <option value="other">Other</option>
                  </select>
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
                  <label>Duration:</label>
                  <input
                    type="text"
                    value={project.duration}
                    onChange={(e) => handleInputChange('projects', 'duration', e.target.value, index)}
                    placeholder="e.g., 3 months, Jan 2023 - Mar 2023"
                  />
                </div>
                <div className="input-group">
                  <label>Technologies/Methods Used:</label>
                  <input
                    type="text"
                    value={project.technologies}
                    onChange={(e) => handleInputChange('projects', 'technologies', e.target.value, index)}
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
                <div className="input-group">
                  <label>Project Outcome:</label>
                  <textarea
                    value={project.outcome}
                    onChange={(e) => handleInputChange('projects', 'outcome', e.target.value, index)}
                  />
                </div>
                <div className="input-group">
                  <label>Project Link (if applicable):</label>
                  <input
                    type="url"
                    value={project.link}
                    onChange={(e) => handleInputChange('projects', 'link', e.target.value, index)}
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
                  <label>Title/Award:</label>
                  <input
                    type="text"
                    value={accomplishment.title}
                    onChange={(e) => handleInputChange('accomplishments', 'title', e.target.value, index)}
                  />
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
                  <input
                    type="text"
                    value={activity.duration}
                    onChange={(e) => handleInputChange('extraCurricular', 'duration', e.target.value, index)}
                    placeholder="e.g., 2 years, Sep 2022 - Present"
                  />
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

        {/* Resume Upload Section */}
        {activeSection === 'resume' && (
          <div className="form-section">
            <h2>Resume Upload</h2>
            <div className="input-group">
              <label>Upload Your Resume:</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <p className="file-info">Accepted formats: PDF, DOC, DOCX. Maximum size: 5MB</p>
            </div>
          </div>
        )}

        {/* Job & Internship Search Section */}
        {activeSection === 'jobSearch' && (
          <div className="form-section">
            <h2>Job & Internship Search</h2>
            <div className="input-group">
              <label>Preferred Industries:</label>
              <div className="checkbox-group">
                {['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Engineering', 'Other'].map((industry) => (
                  <div key={industry} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`industry-${industry}`}
                      checked={formData.jobSearch.industries.includes(industry)}
                      onChange={(e) => {
                        const updatedIndustries = e.target.checked
                          ? [...formData.jobSearch.industries, industry]
                          : formData.jobSearch.industries.filter((item) => item !== industry);
                        handleInputChange('jobSearch', 'industries', updatedIndustries);
                      }}
                    />
                    <label htmlFor={`industry-${industry}`}>{industry}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="input-group">
              <label>Desired Roles:</label>
              <div className="checkbox-group">
                {['Intern', 'Entry Level', 'Junior', 'Mid Level', 'Senior', 'Management', 'Other'].map((role) => (
                  <div key={role} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`role-${role}`}
                      checked={formData.jobSearch.roles.includes(role)}
                      onChange={(e) => {
                        const updatedRoles = e.target.checked
                          ? [...formData.jobSearch.roles, role]
                          : formData.jobSearch.roles.filter((item) => item !== role);
                        handleInputChange('jobSearch', 'roles', updatedRoles);
                      }}
                    />
                    <label htmlFor={`role-${role}`}>{role}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="input-group">
              <label>Location Preferences:</label>
              <div className="checkbox-group">
                {['Local', 'Regional', 'National', 'International', 'No Preference'].map((location) => (
                  <div key={location} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`location-${location}`}
                      checked={formData.jobSearch.locations.includes(location)}
                      onChange={(e) => {
                        const updatedLocations = e.target.checked
                          ? [...formData.jobSearch.locations, location]
                          : formData.jobSearch.locations.filter((item) => item !== location);
                        handleInputChange('jobSearch', 'locations', updatedLocations);
                      }}
                    />
                    <label htmlFor={`location-${location}`}>{location}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="input-group">
              <label>Work Arrangement:</label>
              <select
                value={formData.jobSearch.workArrangement}
                onChange={(e) => handleInputChange('jobSearch', 'workArrangement', e.target.value)}
              >
                <option value="">Select preference</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div className="input-group">
              <label>Availability:</label>
              <select
                value={formData.jobSearch.availability}
                onChange={(e) => handleInputChange('jobSearch', 'availability', e.target.value)}
              >
                <option value="">Select availability</option>
                <option value="fulltime">Full-time</option>
                <option value="parttime">Part-time</option>
                <option value="contract">Contract</option>
                <option value="seasonal">Seasonal</option>
                <option value="internship">Internship</option>
              </select>
            </div>
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
                    Remove Competition/Event
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-button" onClick={() => addItem('competitions')}>
              Add Another Competition/Event
            </button>
          </div>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div className="form-section">
            <h2>Settings</h2>
            <div className="input-group checkbox-item">
              <input
                type="checkbox"
                id="notifications"
                checked={formData.settings.notifications}
                onChange={(e) => handleInputChange('settings', 'notifications', e.target.checked)}
              />
              <label htmlFor="notifications">Receive email notifications about new opportunities</label>
            </div>
            <div className="input-group">
              <label>Profile Visibility:</label>
              <select
                value={formData.settings.profileVisibility}
                onChange={(e) => handleInputChange('settings', 'profileVisibility', e.target.value)}
              >
                <option value="public">Public (visible to all employers)</option>
                <option value="limited">Limited (visible only to approved employers)</option>
                <option value="private">Private (visible only when you apply)</option>
              </select>
            </div>
            <div className="input-group checkbox-item">
              <input
                type="checkbox"
                id="marketingEmails"
                checked={formData.settings.marketingEmails}
                onChange={(e) => handleInputChange('settings', 'marketingEmails', e.target.checked)}
              />
              <label htmlFor="marketingEmails">Receive marketing emails and newsletters</label>
            </div>
          </div>
        )}

        <div className="form-navigation-buttons">
          {sections.findIndex(section => section.id === activeSection) > 0 && (
            <button
              type="button"
              className="nav-button"
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
              className="nav-button next"
              onClick={() => {
                const currentIndex = sections.findIndex(section => section.id === activeSection);
                setActiveSection(sections[currentIndex + 1].id);
              }}
            >
              Next
            </button>
          ) : (
            <button type="submit" className="submit-button">
              Submit Registration
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;