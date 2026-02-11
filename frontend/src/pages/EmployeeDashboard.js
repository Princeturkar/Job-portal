import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const EmployeeDashboard = ({ user }) => {
  const navigate = useNavigate();
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
      const response = await axios.get(`${API_URL}/api/jobs`);
      setJobs(response.data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchMyApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/jobs/my-applications`, {
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
      const response = await axios.get(`${API_URL}/api/jobs/saved`, {
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
      const response = await axios.post(`${API_URL}/api/jobs/${jobId}/apply`, {}, {
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
      await axios.post(`${API_URL}/api/jobs/${jobId}/save`, {}, {
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
                
                <div className="job-info-grid">
                  <div className="info-item">
                    <span className="info-label">📍 Location</span>
                    <span className="info-value">{job.location}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🏢 Company</span>
                    <span className="info-value">{job.company}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📁 Job Type</span>
                    <span className="info-value">{job.jobType || 'Full Time'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🌐 Work Mode</span>
                    <span className="info-value">{job.workMode || 'Remote'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">⏳ Experience</span>
                    <span className="info-value">{job.experience || '0 to 2 years'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">💰 Compensation</span>
                    <span className="info-value">{job.salary || 'Competitive'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">👥 Applications</span>
                    <span className="info-value">{job.applications.length}</span>
                  </div>
                </div>

                <div className="job-description-section">
                  <h4>Job Description</h4>
                  <p>{job.description}</p>
                </div>
                
                <div className="job-actions">
                  <button
                    onClick={() => handleApply(job._id)}
                    className="apply-btn-large"
                    disabled={job.applications.includes(user.id)}
                  >
                    {job.applications.includes(user.id) ? '✅ Applied' : 'Apply Now'}
                  </button>
                  <button
                    onClick={() => handleSaveJob(job._id)}
                    className="btn btn-secondary"
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
          <div style={{marginTop: '20px'}}>
            <button onClick={() => navigate('/profile')} className="btn">📄 Manage Resume & Profile Details</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;">📄 Manage Resume & Profile Details</button>
          </div>
        </div>
      )}
      )}
    </div>
  );
};

export default EmployeeDashboard;