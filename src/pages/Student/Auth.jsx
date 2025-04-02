import React, { useState } from 'react';
import "../../styles/Student/Auth.css";

const Auth = () => {
  // State to toggle between login and signup views
  const [isLogin, setIsLogin] = useState(true);

  // State for login form inputs
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    remember: false
  });

  // State for signup form inputs
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false
  });

  // Handles changes in the login form inputs
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handles changes in the signup form inputs
  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handles login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login form submitted', loginData);
  };

  // Handles signup form submission with validation
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    let isValid = true;
    const newErrors = { password: false, confirmPassword: false };
    
    // Password length validation
    if (signupData.password.length < 8) {
      newErrors.password = true;
      isValid = false;
    }
    
    // Confirm password validation
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = true;
      isValid = false;
    }
    
    setErrors(newErrors);
    
    if (isValid) {
      // TODO: Implement signup logic
      console.log('Signup form submitted', signupData);
    }
  };

  // Toggles between login and signup views
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {isLogin ? (
          // Login Form
          <>
            <div className="auth-header">
              <div className="auth-logo">VerQ</div>
              <h1 className="auth-title">Welcome back</h1>
              <p className="auth-subtitle">Enter your credentials to access your account</p>
            </div>
            
            <form id="login-form" onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-input"  
                  required
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  className="form-input" 
                  required
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
              </div>
              
              <div className="form-footer">
                <div className="remember-me">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    name="remember" 
                    className="checkbox-input"
                    checked={loginData.remember}
                    onChange={handleLoginChange}
                  />
                  <label htmlFor="remember" className="checkbox-label">Remember me</label>
                </div>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              
              <button type="submit" className="btn-auth">Sign In</button>
            </form>
          </>
        ) : (
          // Signup Form
          <>
            <div className="auth-header">
              <div className="auth-logo">VerQ</div>
              <h1 className="auth-title">Create an account</h1>
              <p className="auth-subtitle">Start your journey with us today</p>
            </div>
            
            <form id="signup-form" onSubmit={handleSignupSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-input" 
                  required
                  value={signupData.name}
                  onChange={handleSignupChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="signup-email" className="form-label">Email</label>
                <input 
                  type="email" 
                  id="signup-email" 
                  name="email" 
                  className="form-input"  
                  required
                  value={signupData.email}
                  onChange={handleSignupChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="signup-password" className="form-label">Password</label>
                <input 
                  type="password" 
                  id="signup-password" 
                  name="password" 
                  className="form-input" 
                  required
                  value={signupData.password}
                  onChange={handleSignupChange}
                />
                {errors.password && (
                  <div className="form-error">Password must be at least 8 characters</div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  className="form-input" 
                  required
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                />
                {errors.confirmPassword && (
                  <div className="form-error">Passwords do not match</div>
                )}
              </div>
              
              <button type="submit" className="btn-auth">Create Account</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
