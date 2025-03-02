 import "../styles/LandingPage.css";
// import { Link } from "react-router-dom";
// // import videoSrc from "../assets/vecteezy_a-global-network-around-the-planet-earth_2018420.mp4";

// function LandingPage() {
//     return (
//         <div className="main-container">
//             {/* Video Background */}
//             <div className="video-background">
//                 <video autoPlay loop muted playsInline >
//                     <source src="src\assets\vecteezy_a-global-network-around-the-planet-earth_2018420.mp4" type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>
//                 <div className="overlay"></div>
//             </div>

//             {/* Navigation */}
//             <nav className="navbar">
//                 <div className="navbar-container">
//                     <Link className="navbar-brand" to="/">
//                         Logo
//                     </Link>
//                     <div className="navbar-links">
//                         <Link className="nav-link" to="/about">
//                             About Us
//                         </Link>
//                         <Link className="nav-link" to="/login">
//                             Login
//                         </Link>
//                         <Link className="btn btn-primary" to="/signup">
//                             Sign Up
//                         </Link>
//                     </div>
//                 </div>
//             </nav>

//             {/* Main Content */}
//             <main className="content-wrapper">
//                 <h1 aria-hidden="true" data-split="lines" data-reveal="load" className="h-display">
//                     <div className="single-line-wrap">
//                         <div className="single-line">
//                         Welcome to VERQ!

//                         </div>
//                     </div>
//                     <div className="single-line-wrap">
//                         <div className="single-line" >
//                         Your Placement Starts Here
//                         </div>
//                     </div>
//                 </h1>
//             </main>
//         </div>
//     );
// }

// export default LandingPage;

import React from "react";


const LandingPage = () => {
  return (
   
        <div className="container">
          <div className="left-panel">
          <div className="category">
          <div id=" red">Web Development →</div>
          <div id=" blue">Cloud Computing →</div>
          </div>
          <div className="category"> <div id=" yellow">Network →</div>
          <div id=" purple">Communication →</div>
          </div>
          <div className="category">
          <div id=" green">Data Structures and Algorithms →</div>
          <div id=" blue">LeetCode →</div>
          </div>
          <div className="category">
          <div id=" white">Projects →</div>
          <div id=" red">Resume →</div>
          </div>
          <div className="category"> 
          <div id=" orange">Artificial Intelligence →</div>
          <div id=" green">Interview →</div>
          </div>
          <div className="category"> 
          <div id=" pink">Placement →</div>
          <div id=" indigo">Data Science →</div>
          </div>
           
           
            
            
           
           
          </div>
          <div className="right-panel">
            <h1>Bridging the Gap Between College and Career, One Opportunity at a Time.</h1>
            <p>Your placement journey starts here!</p>
            <div className="buttons">
              <button className="btn">Sign Up</button>
              <button className="btn">Sign In</button>
            </div>
          </div>
        </div>
      );
    };

export default LandingPage;

