import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

import LandingPage from "./pages/Student/LandingPage";
import Auth from "./pages/Student/Auth";

import Default from "./pages/Student/Default";
import Dashboard from "./pages/Student/Dashboard";
import OngoingDrives from "./pages/Student/OngoingDrives";
import UpcomingDrives from "./pages/Student/UpcomingDrives";
import ParticipatedDrives from "./pages/Student/ParticipatedDrives";
import Roadmaps from "./pages/Student/Roadmaps";
import Settings from "./pages/Student/Settings";
import Form from "./pages/Student/Form";
import JobDetails from "./pages/Student/JobDetails"
import Application from "./pages/Student/Application";
import Sidebar from "./components/Sidebar";
import "./styles/Student/Sidebar.css"
 
import PostJobs from "./pages/Recruiter/PostJobs";
import CompanyProfile from "./pages/Recruiter/CompanyProfile";
import RSidebar from "./components/RSidebar";
import "./styles/Recruiter/RSidebar.css";

function App() {
    return (
        <ThemeProvider>
          <Router>
            <div className="app">
              <RSidebar />
              <main className="main-content">
                <Routes>
                  {/* <Route path="/" element={<Default />} />
                  <Route path="/Dashboard" element={<Dashboard />} />
                  <Route path="/participated-drives" element={<ParticipatedDrives />} />
                  <Route path="/ongoing-drives" element={<OngoingDrives />} />
                  <Route path="/upcoming-drives" element={<UpcomingDrives />} />
                  <Route path="/student-registration" element={<Form />} />
                  <Route path="/job-details/:id" element={<JobDetails />} />
                  <Route path="/apply/:id" element={<Application />} />
                  <Route path="/roadmaps" element={<Roadmaps />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="profile" element={<Form />} /> */}
                  <Route path="/company-profile" element={<CompanyProfile />} />
                  <Route path="/post-jobs" element={<PostJobs />} />
                </Routes>
              </main>
            </div>
          </Router>
        </ThemeProvider>
      );
}

export default App;