import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <Link to="/dashboard" className="navbar-brand">
            Interview Scheduler
          </Link>
          
          <div className="nav-links">
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/schedule" 
              className={`nav-link ${location.pathname === '/schedule' ? 'active' : ''}`}
            >
              Schedule Interview
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;