import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, logout }) => {
  return (
    <div className="navbar">
      <h1>Job Portal</h1>
      <nav>
        {user ? (
          <>
            <Link to="/">Dashboard</Link>
            {user.role === 'admin' && <Link to="/add-details">Add Details</Link>}
            <span>Welcome, {user.name} ({user.role})</span>
            <button onClick={logout} className="btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;