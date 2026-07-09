import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.brand}>
          Job API Platform
        </Link>
        <div style={styles.links}>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" style={styles.link}>Dashboard</Link>
              <Link to="/jobs" style={styles.link}>Job Search</Link>
              <Link to="/applied" style={styles.link}>Applied Jobs</Link>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={styles.link}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: { backgroundColor: '#fff', borderBottom: '1px solid #e5e8f0' },
  inner: {
    maxWidth: 960,
    margin: '0 auto',
    padding: '14px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: { fontWeight: 700, fontSize: 18, color: '#3a5ce5' },
  links: { display: 'flex', gap: 16, alignItems: 'center' },
  link: { fontWeight: 500, color: '#1f2430' },
};

export default Navbar;
