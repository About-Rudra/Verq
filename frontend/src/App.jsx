// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { ThemeProvider } from "./context/ThemeContext";
// import { useState, useEffect } from "react";

// import LandingPage from "./pages/LandingPage";

// // Student Pages
// import Auth from "./pages/Student/Auth";
// import StudentDashboard from "./pages/Student/StudentDashboard";
// import OngoingDrives from "./pages/Student/OngoingDrives";
// import UpcomingDrives from "./pages/Student/UpcomingDrives";
// import ParticipatedDrives from "./pages/Student/ParticipatedDrives";
// import Roadmaps from "./pages/Student/Roadmaps";
// import Settings from "./pages/Student/Settings";
// import StudentProfile from "./pages/Student/StudentProfile";
// import JobDetails from "./pages/Student/JobDetails";
// import Application from "./pages/Student/Application";
// import StudentPerks from "./pages/Student/StudentPerks";
// import Projects from "./pages/Student/Projects";
// import Notifications from "./pages/Student/Notifications";
// import Forum from "./pages/Student/Forum";
// import StudentSidebar from "./components/StudentSidebar";

// // Recruiter Pages
// import RecruiterDashboard from "./pages/Recruiter/RecruiterDashboard";
// import PostJobs from "./pages/Recruiter/PostJobs";
// import CompanyProfile from "./pages/Recruiter/CompanyProfile";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userType, setUserType] = useState(null); // 'student' or 'recruiter'

//   // Check auth status on initial load
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const storedUserType = localStorage.getItem("userType");
//     if (token && storedUserType) {
//       setIsLoggedIn(true);
//       setUserType(storedUserType);
//     }
//   }, []);

//   // Handle login (to be called from Auth component)
//   const handleLogin = (token, type) => {
//     localStorage.setItem("authToken", token);
//     localStorage.setItem("userType", type);
//     setIsLoggedIn(true);
//     setUserType(type);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userType");
//     setIsLoggedIn(false);
//     setUserType(null);
//   };

//   return (
//     <ThemeProvider>
//       <Router>
      
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<LandingPage />} />
//           <Route
//             path="/auth"
//             element={
//               isLoggedIn ? (
//                 <Navigate to={userType === 'student' ? "/student-dashboard" : "/recruiter-dashboard"} />
//               ) : (
//                 <Auth onLogin={handleLogin} />
//               )
//             }
//           />
          

//           {/* Protected Student Routes */}
//           {userType === 'student' && (
//             <>
//               <Route
//                 path="/student-dashboard"
//                 element={
//                   <StudentDashboard onLogout={handleLogout} />
//                 }
//               />
//               <Route
//                 path="/ongoing-drives"
//                 element={<OngoingDrives onLogout={handleLogout} />}
//               />
//               <Route
//                 path="/upcoming-drives"
//                 element={<UpcomingDrives onLogout={handleLogout} />}
//               />
//               <Route
//                 path="/participated-drives"
//                 element={<ParticipatedDrives onLogout={handleLogout} />}
//               />
//               <Route
//                 path="/student-profile"
//                 element={<StudentProfile onLogout={handleLogout} />}
//               />
//               <Route
//                 path="/job-details/:id"
//                 element={<JobDetails onLogout={handleLogout} />}
//               />
//               <Route
//                 path="/apply/:id"
//                 element={<Application onLogout={handleLogout} />}
//               />
//               <Route
//                 path="/roadmaps"
//                 element={<Roadmaps onLogout={handleLogout} />}
//               />
//               <Route
//                 path="/student-perks"
//                 element={<StudentPerks onLogout={handleLogout} />}
//               />
//               <Route
//                 path="/settings"
//                 element={<Settings onLogout={handleLogout} />}
//               />
//               <Route
//                 path="/projects"
//                 element={<Projects onLogout={handleLogout} />}
//               />
//               <Route
//                 path="/notifications"
//                 element={<Notifications onLogout={handleLogout} />}
//               />
//               <Route
//                 path="/forum"
//                 element={<Forum onLogout={handleLogout} />}
//               />
//             </>
//           )}

//           {/* Protected Recruiter Routes */}
//           {userType === 'recruiter' && (
//             <>
//               <Route
//                 path="/recruiter-dashboard"
//                 element={<RecruiterDashboard onLogout={handleLogout} />}
//               />
//               <Route
//                 path="/post-jobs"
//                 element={<PostJobs onLogout={handleLogout} />}
//               />
//               <Route
//                 path="/company-profile"
//                 element={<CompanyProfile onLogout={handleLogout} />}
//               />
//             </>
//           )}

//           {/* Fallback Routes */}
//           <Route
//             path="*"
//             element={
//               isLoggedIn ? (
//                 <Navigate to={userType === 'student' ? "/student-dashboard" : "/recruiter-dashboard"} />
//               ) : (
//                 <Navigate to="/" />
//               )
//             }
//           />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { useState, useEffect } from "react";
import { verifyToken } from "./api/auth";

import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Student/Auth";

// Student Pages
import StudentDashboard from "./pages/Student/StudentDashboard";
import OngoingDrives from "./pages/Student/OngoingDrives";
import UpcomingDrives from "./pages/Student/UpcomingDrives";
import ParticipatedDrives from "./pages/Student/ParticipatedDrives";
import Roadmaps from "./pages/Student/Roadmaps";
import Settings from "./pages/Student/Settings";
import StudentDetailsForm from "./pages/Student/StudentDetailsForm";
import JobDetails from "./pages/Student/JobDetails";
import Application from "./pages/Student/Application";
import StudentPerks from "./pages/Student/StudentPerks";
import Projects from "./pages/Student/Projects";
import Notifications from "./pages/Student/Notifications";
import Forum from "./pages/Student/Forum";

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

  // Check auth status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isValid = await verifyToken();
        if (isValid) {
          const storedUserType = localStorage.getItem("userType");
          setIsLoggedIn(true);
          setUserType(storedUserType);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // Handle login
  const handleLogin = (token, type, isFirstTime = false) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userType", type);
    localStorage.setItem("isFirstTime", isFirstTime.toString());
    setIsLoggedIn(true);
    setUserType(type);
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
    localStorage.removeItem("isFirstTime");
    setIsLoggedIn(false);
    setUserType(null);
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
                <Navigate to={
                  userType === 'student' 
                    ? (localStorage.getItem('isFirstTime') === 'true' 
                        ? "/student-form" 
                        : "/student-dashboard")
                    : "/recruiter-dashboard"
                } />
              ) : (
                <Auth onLogin={handleLogin} />
              )
            }
          />

          {/* Protected Student Routes */}
          {userType === 'student' && (
            <Route element={<AppLayout onLogout={handleLogout} />}>
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/ongoing-drives" element={<OngoingDrives />} />
              <Route path="/upcoming-drives" element={<UpcomingDrives />} />
              <Route path="/participated-drives" element={<ParticipatedDrives />} />
              <Route path="/student-form" element={<StudentDetailsForm />} />
              <Route path="/job-details/:id" element={<JobDetails />} />
              <Route path="/apply/:id" element={<Application />} />
              <Route path="/roadmaps" element={<Roadmaps />} />
              <Route path="/student-perks" element={<StudentPerks />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/forum" element={<Forum />} />
            </Route>
          )}

          {/* Protected Recruiter Routes */}
          {userType === 'recruiter' && (
            <Route element={<AppLayout onLogout={handleLogout} />}>
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
                <Navigate to={
                  userType === 'student' 
                    ? (localStorage.getItem('isFirstTime') === 'true' 
                        ? "/student-form" 
                        : "/student-dashboard")
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

