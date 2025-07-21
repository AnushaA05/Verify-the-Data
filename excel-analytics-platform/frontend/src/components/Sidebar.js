import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>📊 Excel Analytics</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard">Upload File</Link></li>
          <li><Link to="/charts">Chart Preview</Link></li>
          <li><Link to="/history">History</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;



