import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      <div className="landing-hero">
        <h1>
          Transform Spreadsheets Into <span>Smart Dashboards</span>
        </h1>
        <p>
          Upload, analyze, and visualize your Excel data effortlessly.
        </p>
        <Link to="/login" className="cta-btn">Get Started</Link>
      </div>
    </div>
  );
};

export default LandingPage;












