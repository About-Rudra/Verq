import React, { useState } from 'react';
import "../../styles/Student/Auth.css";

const Auth = () => {
  // State to toggle between login and signup views
  const [isLogin, setIsLogin] = useState(true);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    remember: false
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  // Validation errors state
  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false
  });

  // Handle login form changes
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle signup form changes
  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login form submitted', loginData);
  };

  // Handle signup form submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    let isValid = true;
    const newErrors = { password: false, confirmPassword: false };
    
    if (signupData.password.length < 8) {
      newErrors.password = true;
      isValid = false;
    }
    
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = true;
      isValid = false;
    }
    
    setErrors(newErrors);
    
    if (isValid) {
      // Add signup logic here
      console.log('Signup form submitted', signupData);
    }
  };

  // Toggle between login and signup views
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
              
              <div className="remember-me" style={{ marginBottom: '20px' }}>
                <input 
                  type="checkbox" 
                  id="terms" 
                  name="terms" 
                  className="checkbox-input" 
                  required
                  checked={signupData.terms}
                  onChange={handleSignupChange}
                />
                <label htmlFor="terms" className="checkbox-label">
                  I agree to the <a href="#" className="forgot-password">Terms of Service</a> and <a href="#" className="forgot-password">Privacy Policy</a>
                </label>
              </div>
              
              <button type="submit" className="btn-auth">Create Account</button>
            </form>
          </>
        )}
        
        <div className="auth-divider">
          <div className="divider-line"></div>
          <span className="divider-text">Or continue with</span>
          <div className="divider-line"></div>
        </div>
        
        <div className="social-buttons">
          <button className="btn-social">
            Google
          </button>
          <button className="btn-social">
            GitHub
          </button>
        </div>
        
        <div className="auth-redirect">
          {isLogin ? (
            <>Don't have an account? <a href="#" onClick={toggleAuthMode}>Sign up</a></>
          ) : (
            <>Already have an account? <a href="#" onClick={toggleAuthMode}>Sign in</a></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;