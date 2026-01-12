import React from 'react';
import { Link } from 'react-router-dom';

const LoginSelect = () => {
  return (
    <div className="container">
      <h2>🚪 Choose Login Type</h2>
      
      <div style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap'}}>
        <div className="job-card" style={{maxWidth: '300px', textAlign: 'center'}}>
          <h3>🔍 Job Seeker</h3>
          <p>Looking for jobs? Login here to browse and apply for positions.</p>
          <Link to="/jobseeker-login" className="btn" style={{textDecoration: 'none', display: 'inline-block', marginTop: '1rem'}}>
            Job Seeker Login
          </Link>
        </div>
        
        <div className="job-card" style={{maxWidth: '300px', textAlign: 'center'}}>
          <h3>👨💼 Admin</h3>
          <p>Manage jobs and applications? Login here to access admin features.</p>
          <Link to="/admin-login" className="btn" style={{textDecoration: 'none', display: 'inline-block', marginTop: '1rem'}}>
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSelect;