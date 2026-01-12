import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginSelect from './pages/LoginSelect';
import JobSeekerLogin from './pages/JobSeekerLogin';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AddDetails from './pages/AddDetails';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const getDashboard = () => {
    if (!user) return <Navigate to="/login" />;
    return user.role === 'admin' ? <AdminDashboard user={user} /> : <EmployeeDashboard user={user} />;
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} logout={logout} />
        <Routes>
          <Route path="/" element={getDashboard()} />
          <Route path="/login" element={!user ? <LoginSelect /> : <Navigate to="/" />} />
          <Route path="/jobseeker-login" element={!user ? <JobSeekerLogin setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/admin-login" element={!user ? <AdminLogin setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/add-details" element={user?.role === 'admin' ? <AddDetails /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;