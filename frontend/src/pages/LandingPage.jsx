// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/LandingPage.css";
// import bgImage from "../assets/bg.png";

// const LandingPage = () => {
//   const navigate = useNavigate();

//   const handleStudentClick = () => {
//     navigate("/auth", { state: { userType: "student" } });
//   };

//   const handleRecruiterClick = () => {
//     navigate("/auth", { state: { userType: "recruiter" } });
//   };

//   return (
//     <div className="scroll-container">
//       <div className="scrolling-content" style={{ backgroundImage: `url(${bgImage}) `}}></div>
//       <div className="overlay-box">
//         <div className="auth-buttons">
//           <button className="btn" onClick={handleRecruiterClick}>Recruiter</button>
//           <button className="btn" onClick={handleStudentClick}>Student</button>
//         </div>
//         <div className="text-content">
//           <h1 className="main-heading">BRIDGING THE GAP BETWEEN COLLEGE AND CAREER, ONE OPPORTUNITY AT A TIME.</h1>
//           <p className="subtext">YOUR PLACEMENT JOURNEY STARTS HERE!</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import bgImage from "../assets/bg.png";

const LandingPage = ({ isLoggedIn, userType }) => {
  const navigate = useNavigate();

  const handleStudentClick = () => {
    if (isLoggedIn && userType === 'student') {
      navigate("/student-dashboard");
    } else {
      navigate("/auth", { state: { userType: "student" } });
    }
  };

  const handleRecruiterClick = () => {
    if (isLoggedIn && userType === 'recruiter') {
      navigate("/recruiter-dashboard");
    } else {
      navigate("/auth", { state: { userType: "recruiter" } });
    }
  };

  return (
    <div className="scroll-container">
      <div className="scrolling-content" style={{ backgroundImage: `url(${bgImage}) `}}></div>
      <div className="overlay-box">
        <div className="auth-buttons">
          <button className="btn" onClick={handleRecruiterClick}>Recruiter</button>
          <button className="btn" onClick={handleStudentClick}>Student</button>
        </div>
        <div className="text-content">
          <h1 className="main-heading">BRIDGING THE GAP BETWEEN COLLEGE AND CAREER, ONE OPPORTUNITY AT A TIME.</h1>
          <p className="subtext">YOUR PLACEMENT JOURNEY STARTS HERE!</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;