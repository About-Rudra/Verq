import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./pages/Student/Dashboard";
import LandingPage from "./pages/Student/LandingPage";
import OngoingDrives from "./pages/Student/OngoingDrives";
import UpcomingDrives from "./pages/Student/UpcomingDrives";
import Auth from "./pages/Student/Auth";
import TechDirectory from "./pages/Student/TechDirectory";
import EditProfile from "./pages/Student/EditProfile";
import Form from "./pages/Student/Form";
import Sidebar from "./components/Sidebar";
import "./styles/Student/Sidebar.css"

function App() {
    return (
        <ThemeProvider>
          <Router>
            <div className="app">
              <Sidebar />
              <main className="main-content">
                <Routes>
                  <Route path="/Dashboard" element={<Dashboard />} />
                  <Route path="/tech-directory" element={<TechDirectory />} />
                  <Route path="/ongoing-drives" element={<OngoingDrives />} />
                  <Route path="/upcoming-drives" element={<UpcomingDrives />} />
                  {/* <Route path="/roadmap" element={<Roadmap />} /> 
                    <Route path="/companies" element={<Companies />} />
                  <Route path="/docs" element={<Docs />} /> */}
                </Routes>
              </main>
            </div>
          </Router>
        </ThemeProvider>
      );
}

export default App;