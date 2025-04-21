import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { useState, useEffect } from "react";
import { verifyToken } from "./api/auth";

import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";

// Student Pages
import Default from "./pages/Student/Default";
import StudentDashboard from "./pages/Student/StudentDashboard";
import OngoingDrives from "./pages/Student/OngoingDrives";
import UpcomingDrives from "./pages/Student/UpcomingDrives";
import ParticipatedDrives from "./pages/Student/ParticipatedDrives";
import Roadmaps from "./pages/Student/Roadmaps";
import Settings from "./pages/Student/Settings";
import JobDetails from "./pages/Student/JobDetails";
import Application from "./pages/Student/Application";
import StudentPerks from "./pages/Student/StudentPerks";
import ATS from "./pages/Student/ATS";
import MockInterviews from "./pages/Student/MockInterviews";
import Projects from "./pages/Student/Projects";
import Companies from "./pages/Student/Companies";
import Notifications from "./pages/Student/Notifications";
import Forum from "./pages/Student/Forum";
import StudentDetailsForm from "./pages/Student/StudentDetailsForm";

// Recruiter Pages
import RecruiterDashboard from "./pages/Recruiter/RecruiterDashboard";
import PostJobs from "./pages/Recruiter/PostJobs";
import CompanyProfile from "./pages/Recruiter/CompanyProfile";

// Layout Component
import AppLayout from "./components/AppLayout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  // Check auth status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isValid = await verifyToken();
        if (isValid) {
          const storedUserType = localStorage.getItem("userType");
          const newUserFlag = localStorage.getItem("isNewUser") === "true";
          
          setIsLoggedIn(true);
          setUserType(storedUserType);
          setIsNewUser(newUserFlag);  
        } else {
          // Clear any potentially stale auth data
          localStorage.removeItem("authToken");
          localStorage.removeItem("userType");
          localStorage.removeItem("isNewUser");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear auth data on error
        localStorage.removeItem("authToken");
        localStorage.removeItem("userType");
        localStorage.removeItem("isNewUser");
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // Handle login
  const handleLogin = (token, type, isNewSignup = false) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userType", type);
    
    if (isNewSignup && type === 'student') {
      localStorage.setItem("isNewUser", "true");
      setIsNewUser(true);
    }
    
    setIsLoggedIn(true);
    setUserType(type);
  };

  // Handle completion of student details form
  const handleFormCompletion = () => {
    localStorage.removeItem("isNewUser");
    setIsNewUser(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("isNewUser");
    setIsLoggedIn(false);
    setUserType(null);
    setIsNewUser(false);
  };

  if (isCheckingAuth) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} userType={userType} />} />
          
          <Route
            path="/auth"
            element={
              isLoggedIn ? (
                userType === 'student' && isNewUser ? 
                <Navigate to="/student-form" /> :
                <Navigate to={
                  userType === 'student' 
                    ? "/default"
                    : "/recruiter-dashboard"
                } />
              ) : (
                <Auth onLogin={handleLogin} />
              )
            }
          />
          
          {/* Student Details Form with completion handler */}
          <Route
            path="/student-form"
            element={
              isLoggedIn && userType === 'student'
                ? <StudentDetailsForm onFormSubmit={handleFormCompletion} />
                : <Navigate to="/auth" />
            }
          />

          {/* Protected Student Routes */}
          {isLoggedIn && userType === 'student' && (
            <Route 
              element={
                isNewUser 
                  ? <Navigate to="/student-form" />
                  : <AppLayout onLogout={handleLogout} userType={userType} />
              }
            >
              <Route path="/default" element={<Default />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/ongoing-drives" element={<OngoingDrives />} />
              <Route path="/upcoming-drives" element={<UpcomingDrives />} />
              <Route path="/participated-drives" element={<ParticipatedDrives />} />
              <Route path="/job-details/:id" element={<JobDetails />} />
              <Route path="/apply/:id" element={<Application />} />
              <Route path="/roadmaps" element={<Roadmaps />} />
              <Route path="/student-perks" element={<StudentPerks />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/ats-checker" element={<ATS />} />
              <Route path="/mock-interviews" element={<MockInterviews />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/forum" element={<Forum />} />
            </Route>
          )}

          {/* Protected Recruiter Routes */}
          {isLoggedIn && userType === 'recruiter' && (
            <Route element={<AppLayout onLogout={handleLogout} userType={userType} />}>
              <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
              <Route path="/post-jobs" element={<PostJobs />} />
              <Route path="/company-profile" element={<CompanyProfile />} />
            </Route>
          )}

          {/* Fallback Routes */}
          <Route
            path="*"
            element={
              isLoggedIn ? (
                userType === 'student' && isNewUser ? 
                <Navigate to="/student-form" /> :
                <Navigate to={
                  userType === 'student' 
                    ? "/default"
                    : "/recruiter-dashboard"
                } />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

