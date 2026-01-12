import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDashboard = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('browse-jobs');
  const [myApplications, setMyApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
    if (activeTab === 'my-applications') {
      fetchMyApplications();
    }
    if (activeTab === 'saved-jobs') {
      fetchSavedJobs();
    }
  }, [activeTab]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchMyApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/jobs/my-applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyApplications(response.data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/jobs/saved', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSavedJobs(response.data || []);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Frontend apply - Job ID:', jobId, 'User:', user);
      const response = await axios.post(`http://localhost:5000/api/jobs/${jobId}/apply`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Apply response:', response.data);
      fetchJobs();
      alert('Applied successfully!');
    } catch (error) {
      console.error('Apply error:', error.response?.data);
      alert(error.response?.data?.message || 'Application failed');
    }
  };

  const handleSaveJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/jobs/${jobId}/save`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Job saved!');
    } catch (error) {
      alert('Failed to save job');
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>🔍 Employee Dashboard</h2>
      
      <div className="employee-tabs" style={{marginBottom: '2rem'}}>
        <button 
          onClick={() => setActiveTab('browse-jobs')} 
          className={`btn ${activeTab === 'browse-jobs' ? 'btn-success' : 'btn-secondary'}`}
          style={{marginRight: '1rem'}}
        >
          🔍 Browse Jobs
        </button>
        <button 
          onClick={() => setActiveTab('my-applications')} 
          className={`btn ${activeTab === 'my-applications' ? 'btn-success' : 'btn-secondary'}`}
          style={{marginRight: '1rem'}}
        >
          📝 My Applications
        </button>
        <button 
          onClick={() => setActiveTab('saved-jobs')} 
          className={`btn ${activeTab === 'saved-jobs' ? 'btn-success' : 'btn-secondary'}`}
          style={{marginRight: '1rem'}}
        >
          💾 Saved Jobs
        </button>
        <button 
          onClick={() => setActiveTab('profile')} 
          className={`btn ${activeTab === 'profile' ? 'btn-success' : 'btn-secondary'}`}
        >
          👤 Profile
        </button>
      </div>

      {activeTab === 'browse-jobs' && (
        <>
          <div className="search-section" style={{marginBottom: '2rem'}}>
            <div className="form-group">
              <label>🔍 Search Jobs</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, company, or location..."
              />
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="empty-state">
              <p>💼 No jobs found</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <div key={job._id} className="job-card">
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary || 'Not specified'}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Posted by:</strong> {job.admin?.name || 'Admin'}</p>
                <p><strong>Applications:</strong> {job.applications.length}</p>
                
                <div className="job-actions">
                  <button
                    onClick={() => handleApply(job._id)}
                    className="btn btn-success"
                    disabled={job.applications.includes(user.id)}
                  >
                    {job.applications.includes(user.id) ? '✅ Applied' : '📝 Apply Now'}
                  </button>
                  <button
                    onClick={() => handleSaveJob(job._id)}
                    className="btn"
                    style={{marginLeft: '10px'}}
                  >
                    💾 Save Job
                  </button>
                </div>
              </div>
            ))
          )}
        </>
      )}

      {activeTab === 'my-applications' && (
        <div>
          <h3>📝 My Job Applications</h3>
          <p>Total Applications: {myApplications.length}</p>
          {myApplications.map(app => (
            <div key={app._id} className="job-card">
              <h3>{app.jobTitle}</h3>
              <p><strong>Company:</strong> {app.company}</p>
              <p><strong>Applied on:</strong> {new Date(app.appliedDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {app.status || 'Pending'}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'saved-jobs' && (
        <div>
          <h3>💾 Saved Jobs</h3>
          <p>Total Saved: {savedJobs.length}</p>
          {savedJobs.map(job => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <div className="job-actions">
                <button onClick={() => handleApply(job._id)} className="btn btn-success">
                  📝 Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="job-card">
          <h3>👤 Employee Profile</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;