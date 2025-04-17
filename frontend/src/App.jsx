import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/student/Auth.css';

const Auth = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState('student');
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '', remember: false });
  const [signupData, setSignupData] = useState({ email: '', password: '', confirmPassword: '', terms: false });
  const [errors, setErrors] = useState({ 
    password: false, 
    confirmPassword: false,
    form: null // For backend errors
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.userType) {
      setUserType(location.state.userType);
    }
    // Clear errors when switching between login/signup
    setErrors({ password: false, confirmPassword: false, form: null });
  }, [location, isLogin]);

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    // Clear errors when user types
    if (errors.form) setErrors(prev => ({ ...prev, form: null }));
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    // Clear errors when user types
    if (errors.form || errors.password || errors.confirmPassword) {
      setErrors(prev => ({ 
        ...prev, 
        form: null,
        password: false,
        confirmPassword: false 
      }));
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ ...errors, form: null });

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
          userType
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.token, userType);
        navigate(userType === 'student' ? '/student-dashboard' : '/recruiter-dashboard');
      } else {
        setErrors(prev => ({ ...prev, form: data.message || 'Login failed' }));
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({ ...prev, form: 'Server error. Please try again later.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Frontend validation
    const passwordValid = signupData.password.length >= 8;
    const passwordsMatch = signupData.password === signupData.confirmPassword;
    const termsAccepted = signupData.terms;

    const newErrors = {
      password: !passwordValid,
      confirmPassword: !passwordsMatch,
      form: null
    };

    if (!termsAccepted) {
      newErrors.form = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);

    if (!passwordValid || !passwordsMatch || !termsAccepted) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signupData.email,
          password: signupData.password,
          userType
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.token, userType);
        navigate(userType === 'student' ? '/student-dashboard' : '/recruiter-dashboard');
      } else {
        setErrors(prev => ({ ...prev, form: data.message || 'Registration failed' }));
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors(prev => ({ ...prev, form: 'Server error. Please try again later.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => setIsLogin(!isLogin);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="user-type-tabs">
          <button className={`tab ${userType === 'student' ? 'active' : ''}`} onClick={() => setUserType('student')}>Student</button>
          <button className={`tab ${userType === 'recruiter' ? 'active' : ''}`} onClick={() => setUserType('recruiter')}>Recruiter</button>
        </div>

        {/* Display backend error message */}
        {errors.form && (
          <div className="form-error-message">
            {errors.form}
          </div>
        )}

        {isLogin ? (
          <>
            <div className="auth-header">
              <div className="auth-logo">VerQ</div>
              <h1 className="auth-title">Welcome back {userType}</h1>
              <p className="auth-subtitle">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required value={loginData.email} onChange={handleLoginChange} />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required value={loginData.password} onChange={handleLoginChange} />
              </div>

              <div className="form-footer">
                <div className="remember-me">
                  <input type="checkbox" id="remember" name="remember" checked={loginData.remember} onChange={handleLoginChange} />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>

              <button type="submit" className="btn-auth" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="auth-header">
              <div className="auth-logo">VerQ</div>
              <h1 className="auth-title">Create {userType} account</h1>
              <p className="auth-subtitle">Start your journey with us today</p>
            </div>

            <form onSubmit={handleSignupSubmit}>
              <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input type="email" id="signup-email" name="email" required value={signupData.email} onChange={handleSignupChange} />
              </div>

              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input type="password" id="signup-password" name="password" required value={signupData.password} onChange={handleSignupChange} />
                {errors.password && <div className="form-error">Password must be at least 8 characters</div>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required value={signupData.confirmPassword} onChange={handleSignupChange} />
                {errors.confirmPassword && <div className="form-error">Passwords don't match</div>}
              </div>

              <div className="remember-me">
                <input type="checkbox" id="terms" name="terms" required checked={signupData.terms} onChange={handleSignupChange} />
                <label htmlFor="terms">I agree to the Terms and Privacy Policy</label>
              </div>

              <button type="submit" className="btn-auth" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </>
        )}

        {/* ... rest of your JSX remains the same ... */}
      </div>
    </div>
  );
};

export default Auth;