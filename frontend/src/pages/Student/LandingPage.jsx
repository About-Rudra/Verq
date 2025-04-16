import React from "react";
import "../../styles/Student/LandingPage.css";
import bgImage from "../../assets/bg.png"; // Adjust the path as necessary

const LandingPage = () => {
  return (
    <div className="scroll-container">
      {/* Scrolling Background */}
      <div className="scrolling-content" style={{ backgroundImage: `url(${bgImage})` }}></div>

      {/* Static Box */}
      <div className="overlay-box">
        {/* Buttons */}
        <div className="auth-buttons">
          <button className="btn">Recruiter</button>
          <button className="btn">Student</button>
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
