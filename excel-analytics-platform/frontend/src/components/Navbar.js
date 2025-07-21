import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';  // make sure this CSS file has your navbar styles

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-left">Excel Analytics</h1>
      <div className="navbar-right">
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button className="login-btn" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="register-btn" onClick={() => navigate('/register')}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



