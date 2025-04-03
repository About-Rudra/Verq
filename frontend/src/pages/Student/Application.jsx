import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import '../../styles/Student/Application.css';

const Application = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    profilePicture: null,
    collegeName: '',
    rollNumber: '',
    branch: '',
    batch: '',
    currentSemester: '',
    cgpa: '',
    primaryEmail: '',
    personalEmail: '',
    phoneNumber: '',
    linkedinProfile: '',
    githubProfile: '',
    personalWebsite: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    text: '',
    class: 'strength-none'
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    document.title = "Apply Now - Student Registration";
  }, []);

  const validateCurrentStep = () => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }
    
    if (currentStep === 2) {
      if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required';
      if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
      if (!formData.branch.trim()) newErrors.branch = 'Branch is required';
      if (!formData.batch.trim()) newErrors.batch = 'Batch is required';
      if (!formData.currentSemester.trim()) newErrors.currentSemester = 'Current semester is required';
      if (!formData.cgpa) newErrors.cgpa = 'CGPA is required';
      else if (isNaN(formData.cgpa)) newErrors.cgpa = 'CGPA must be a number';
    }
    
    if (currentStep === 3) {
      if (!formData.primaryEmail.trim()) newErrors.primaryEmail = 'Primary email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.primaryEmail)) newErrors.primaryEmail = 'Invalid email format';
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (currentStep === 4) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        setPasswordMatch(false);
      } else {
        setPasswordMatch(true);
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file' && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }

    // Password strength and matching
    if (name === 'password') {
      checkPasswordStrength(value);
      if (formData.confirmPassword) {
        setPasswordMatch(value === formData.confirmPassword);
      }
    }
    if (name === 'confirmPassword') {
      setPasswordMatch(value === formData.password);
    }
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (!password) {
      setPasswordStrength({
        score: 0,
        text: '',
        class: 'strength-none'
      });
      return;
    }

    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Complexity checks
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let strengthClass = '';
    let strengthText = '';

    if (score < 2) {
      strengthClass = 'strength-weak';
      strengthText = 'Weak';
    } else if (score < 4) {
      strengthClass = 'strength-medium';
      strengthText = 'Medium';
    } else if (score < 5) {
      strengthClass = 'strength-good';
      strengthText = 'Good';
    } else {
      strengthClass = 'strength-strong';
      strengthText = 'Strong';
    }

    setPasswordStrength({
      score,
      text: strengthText,
      class: strengthClass
    });
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all steps before submission
    let isValid = true;
    for (let step = 1; step <= totalSteps; step++) {
      setCurrentStep(step);
      isValid = validateCurrentStep() && isValid;
      if (!isValid) break;
    }
    
    if (!isValid) {
      alert('Please fix all errors before submitting');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your backend
      // For demonstration, we'll simulate an API call
      console.log('Submitting form data:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      alert('Application submitted successfully!');
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        profilePicture: null,
        collegeName: '',
        rollNumber: '',
        branch: '',
        batch: '',
        currentSemester: '',
        cgpa: '',
        primaryEmail: '',
        personalEmail: '',
        phoneNumber: '',
        linkedinProfile: '',
        githubProfile: '',
        personalWebsite: '',
        password: '',
        confirmPassword: ''
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render form steps
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
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>Last Name*</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleInputChange} 
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth*</label>
                <input 
                  type="date" 
                  name="dateOfBirth" 
                  value={formData.dateOfBirth} 
                  onChange={handleInputChange} 
                  className={errors.dateOfBirth ? 'error' : ''}
                />
                {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
              </div>
              <div className="form-group">
                <label>Gender*</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleInputChange} 
                  className={errors.gender ? 'error' : ''}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>
            </div>
            <div className="form-group">
              <label>Profile Picture</label>
              <input 
                type="file" 
                name="profilePicture" 
                onChange={handleInputChange}
                className="file-input"
                accept="image/*"
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={handleNextStep} className="btn btn-next">Next</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-section">
            <h2 className="section-title">Academic Information</h2>
            <div className="form-group">
              <label>College Name*</label>
              <input 
                type="text" 
                name="collegeName" 
                value={formData.collegeName} 
                onChange={handleInputChange} 
                className={errors.collegeName ? 'error' : ''}
              />
              {errors.collegeName && <span className="error-message">{errors.collegeName}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Roll Number*</label>
                <input 
                  type="text" 
                  name="rollNumber" 
                  value={formData.rollNumber} 
                  onChange={handleInputChange} 
                  className={errors.rollNumber ? 'error' : ''}
                />
                {errors.rollNumber && <span className="error-message">{errors.rollNumber}</span>}
              </div>
              <div className="form-group">
                <label>Branch*</label>
                <input 
                  type="text" 
                  name="branch" 
                  value={formData.branch} 
                  onChange={handleInputChange} 
                  className={errors.branch ? 'error' : ''}
                />
                {errors.branch && <span className="error-message">{errors.branch}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Batch*</label>
                <input 
                  type="text" 
                  name="batch" 
                  value={formData.batch} 
                  onChange={handleInputChange} 
                  className={errors.batch ? 'error' : ''}
                />
                {errors.batch && <span className="error-message">{errors.batch}</span>}
              </div>
              <div className="form-group">
                <label>Current Semester*</label>
                <input 
                  type="text" 
                  name="currentSemester" 
                  value={formData.currentSemester} 
                  onChange={handleInputChange} 
                  className={errors.currentSemester ? 'error' : ''}
                />
                {errors.currentSemester && <span className="error-message">{errors.currentSemester}</span>}
              </div>
            </div>
            <div className="form-group">
              <label>CGPA*</label>
              <input 
                type="number" 
                name="cgpa" 
                value={formData.cgpa} 
                onChange={handleInputChange} 
                step="0.01"
                min="0"
                max="10"
                className={errors.cgpa ? 'error' : ''}
              />
              {errors.cgpa && <span className="error-message">{errors.cgpa}</span>}
            </div>
            <div className="button-group">
              <button type="button" onClick={handlePrevStep} className="btn btn-prev">Previous</button>
              <button type="button" onClick={handleNextStep} className="btn btn-next">Next</button>
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
                  className={errors.primaryEmail ? 'error' : ''}
                />
                {errors.primaryEmail && <span className="error-message">{errors.primaryEmail}</span>}
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
                className={errors.phoneNumber ? 'error' : ''}
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>LinkedIn Profile</label>
                <input 
                  type="url" 
                  name="linkedinProfile" 
                  value={formData.linkedinProfile} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>GitHub Profile</label>
                <input 
                  type="url" 
                  name="githubProfile" 
                  value={formData.githubProfile} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
            <div className="form-group">
              <label>Personal Website</label>
              <input 
                type="url" 
                name="personalWebsite" 
                value={formData.personalWebsite} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={handlePrevStep} className="btn btn-prev">Previous</button>
              <button type="button" onClick={handleNextStep} className="btn btn-next">Next</button>
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
                className={errors.password ? 'error' : ''}
              />
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className={`strength-indicator ${passwordStrength.class}`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  ></div>
                </div>
                {passwordStrength.text && (
                  <div className="strength-text">
                    Password Strength: {passwordStrength.text}
                  </div>
                )}
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label>Confirm Password*</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleInputChange} 
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              {!passwordMatch && (
                <div className="password-mismatch">Passwords do not match!</div>
              )}
            </div>
            <div className="button-group">
              <button type="button" onClick={handlePrevStep} className="btn btn-prev">Previous</button>
              <button 
                type="submit" 
                className="btn btn-submit" 
                disabled={isSubmitting || !passwordMatch || !formData.password || !formData.confirmPassword}
              >
                {isSubmitting ? 'Submitting...' : 'Apply Now'}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Calculate progress bar width
  const progressWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;

  if (submitSuccess) {
    return (
      <div className="registration-container">
        <h1 className="registration-title">Application Submitted!</h1>
        <div className="success-message">
          <p>Thank you for your application. We'll review your information and get back to you soon.</p>
          <button 
            className="btn btn-submit"
            onClick={() => setSubmitSuccess(false)}
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`registration-container ${darkMode ? 'dark-theme' : ''}`}>
      <h1 className="registration-title">Apply Now</h1>
      
      {/* Progress bar */}
      <div className="progress-container">
        <div className="step-indicators">
          {[...Array(totalSteps)].map((_, i) => (
            <div 
              key={i} 
              className={`step-circle ${currentStep > i + 1 ? 'completed' : ''} ${currentStep === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-background"></div>
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
        <div className="step-labels">
          <span className={currentStep === 1 ? 'active' : ''}>Personal Info</span>
          <span className={currentStep === 2 ? 'active' : ''}>Academic Info</span>
          <span className={currentStep === 3 ? 'active' : ''}>Contact Info</span>
          <span className={currentStep === 4 ? 'active' : ''}>Credentials</span>
        </div>
      </div>
      
      <form className="registration-form" onSubmit={handleSubmit}>
        {renderStep()}
      </form>
    </div>
  );
};

export default Application;