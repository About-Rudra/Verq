import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

import LandingPage from "./pages/Student/LandingPage";
import Auth from "./pages/Student/Auth";

import Default from "./pages/Student/Default";
import StudentDashboard from "./pages/Student/StudentDashboard";
import OngoingDrives from "./pages/Student/OngoingDrives";
import UpcomingDrives from "./pages/Student/UpcomingDrives";
import ParticipatedDrives from "./pages/Student/ParticipatedDrives";
import Roadmaps from "./pages/Student/Roadmaps";
import Settings from "./pages/Student/Settings";
import StudentProfile from "./pages/Student/StudentProfile";
import JobDetails from "./pages/Student/JobDetails"
import Application from "./pages/Student/Application";
import StudentSidebar from "./components/StudentSidebar";
import StudentPerks from "./pages/Student/StudentPerks";
import Projects from "./pages/Student/Projects";
import Notifications from "./pages/Student/Notifications";
import FAQ from "./pages/Student/FAQ";
import Forum from "./pages/Student/Forum";
import "./styles/Student/StudentSidebar.css"
 
import RecruiterDashboard from "./pages/Recruiter/RecruiterDashboard";
import PostJobs from "./pages/Recruiter/PostJobs";
import CompanyProfile from "./pages/Recruiter/CompanyProfile";
import RecruiterSidebar from "./components/RecruiterSidebar";
import "./styles/Recruiter/RecruiterSidebar.css";

function App() {
    return (
        <ThemeProvider>
          <Router>
            <div className="app">
              <StudentSidebar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Default />} />
                  <Route path="/student-dashboard" element={<StudentDashboard />} />
                  <Route path="/participated-drives" element={<ParticipatedDrives />} />
                  <Route path="/ongoing-drives" element={<OngoingDrives />} />
                  <Route path="/upcoming-drives" element={<UpcomingDrives />} />
                  <Route path="/student-profile" element={<StudentProfile />} />
                  <Route path="/job-details/:id" element={<JobDetails />} />
                  <Route path="/apply/:id" element={<Application />} />
                  <Route path="/roadmaps" element={<Roadmaps />} />
                  <Route path="/student-perks" element={<StudentPerks />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="profile" element={<StudentProfile />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="forum" element={<Forum />} />
                  <Route path="/faqs" element={<FAQ />} />
                </Routes>
              </main>

              {/* <RecruiterSidebar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Default />} />
                  <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
                  <Route path="/company-profile" element={<CompanyProfile />} />
                  <Route path="/post-jobs" element={<PostJobs />} />
                </Routes>
              </main> */}
            </div>
          </Router>
        </ThemeProvider>
      );
}

export default App;