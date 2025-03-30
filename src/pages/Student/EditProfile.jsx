import React, { useState } from 'react';
import "../../styles/Student/EditProfile.css";

const StudentRegistrationForm = () => {
  // State for managing the current step
  const [currentStep, setCurrentStep] = useState(1);
  
  // State for form data
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    profilePicture: null,
    
    // College Details
    collegeName: '',
    rollNumber: '',
    program: '',
    branch: '',
    batch: '',
    currentSemester: '',
    cgpa: '',
    
    // Contact Information
    primaryEmail: '',
    personalEmail: '',
    phoneNumber: '',
    linkedinProfile: '',
    githubProfile: '',
    personalWebsite: '',
    
    // Login Credentials
    password: '',
    confirmPassword: ''
  });
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file' && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle next button click
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  // Handle previous button click
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your server
    alert('Registration successful!');
  };
  
  // Function to calculate password strength
  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };
  
  const passwordStrength = calculatePasswordStrength(formData.password);
  
  // Determine the color of the password strength indicator
  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'strength-none';
    if (passwordStrength === 1) return 'strength-weak';
    if (passwordStrength === 2) return 'strength-medium';
    if (passwordStrength === 3) return 'strength-good';
    return 'strength-strong';
  };
  
  // Render the appropriate step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-section">
            <h2 className="section-title">Personal Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Date of Birth*</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Gender*</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                onChange={handleInputChange}
                accept="image/*"
                className="file-input"
              />
            </div>
            
            <div className="button-group">
              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-next"
              >
                Next
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="form-section">
            <h2 className="section-title">College Details</h2>
            
            <div className="form-group">
              <label>College Name*</label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Institute Roll Number*</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Program*</label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Program</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="M.Sc">M.Sc</option>
                  <option value="Ph.D">Ph.D</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Branch*</label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="MECH">MECH</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Batch*</label>
                <select
                  name="batch"
                  value={formData.batch}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Batch</option>
                  <option value="2022-2026">2022-2026</option>
                  <option value="2023-2027">2023-2027</option>
                  <option value="2024-2028">2024-2028</option>
                  <option value="2025-2029">2025-2029</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Current Semester*</label>
                <select
                  name="currentSemester"
                  value={formData.currentSemester}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Semester</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                  <option value="6th">6th</option>
                  <option value="7th">7th</option>
                  <option value="8th">8th</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>CGPA</label>
              <input
                type="number"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleInputChange}
                min="0"
                max="10"
                step="0.01"
              />
            </div>
            
            <div className="button-group">
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn btn-prev"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-next"
              >
                Next
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="form-section">
            <h2 className="section-title">Contact Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Primary Email*</label>
                <input
                  type="email"
                  name="primaryEmail"
                  value={formData.primaryEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Personal Email</label>
                <input
                  type="email"
                  name="personalEmail"
                  value={formData.personalEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Phone Number*</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>LinkedIn Profile</label>
              <input
                type="url"
                name="linkedinProfile"
                value={formData.linkedinProfile}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            
            <div className="form-group">
              <label>GitHub Profile</label>
              <input
                type="url"
                name="githubProfile"
                value={formData.githubProfile}
                onChange={handleInputChange}
                placeholder="https://github.com/username"
              />
            </div>
            
            <div className="form-group">
              <label>Personal Website</label>
              <input
                type="url"
                name="personalWebsite"
                value={formData.personalWebsite}
                onChange={handleInputChange}
                placeholder="https://yourwebsite.com"
              />
            </div>
            
            <div className="button-group">
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn btn-prev"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-next"
              >
                Next
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="form-section">
            <h2 className="section-title">Login Credentials</h2>
            
            <div className="form-group">
              <label>Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className={`strength-indicator ${getPasswordStrengthColor()}`} 
                    style={{ width: `${passwordStrength * 25}%` }}
                  ></div>
                </div>
                <p className="strength-text">
                  {passwordStrength === 0 && "Password strength: None"}
                  {passwordStrength === 1 && "Password strength: Weak"}
                  {passwordStrength === 2 && "Password strength: Medium"}
                  {passwordStrength === 3 && "Password strength: Good"}
                  {passwordStrength === 4 && "Password strength: Strong"}
                </p>
              </div>
            </div>
            
            <div className="form-group">
              <label>Confirm Password*</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="password-mismatch">Passwords do not match</p>
              )}
            </div>
            
            <div className="button-group">
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn btn-prev"
              >
                Previous
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-submit"
                disabled={
                  !formData.firstName || 
                  !formData.lastName || 
                  !formData.dateOfBirth || 
                  !formData.gender || 
                  !formData.collegeName || 
                  !formData.rollNumber || 
                  !formData.program || 
                  !formData.branch || 
                  !formData.batch || 
                  !formData.currentSemester || 
                  !formData.primaryEmail || 
                  !formData.phoneNumber || 
                  !formData.password || 
                  !formData.confirmPassword ||
                  formData.password !== formData.confirmPassword
                }
              >
                Create Account
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Progress bar component
  const ProgressBar = () => {
    return (
      <div className="progress-container">
        <div className="step-indicators">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`step-circle ${currentStep >= step ? 'active' : ''}`}
            >
              {step}
            </div>
          ))}
        </div>
        
        <div className="progress-bar-container">
          <div className="progress-bar-background"></div>
          <div
            className="progress-bar-fill"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          ></div>
        </div>
        
        <div className="step-labels">
          <span className={currentStep >= 1 ? 'active' : ''}>Personal</span>
          <span className={currentStep >= 2 ? 'active' : ''}>College</span>
          <span className={currentStep >= 3 ? 'active' : ''}>Contact</span>
          <span className={currentStep >= 4 ? 'active' : ''}>Login</span>
        </div>
      </div>
    );
  };
  
  return (
    <div className="registration-container">
      <h1 className="registration-title">Student Registration</h1>
      
      <ProgressBar />
      
      <form className="registration-form">
        {renderStep()}
      </form>
    </div>
  );
};

export default StudentRegistrationForm;