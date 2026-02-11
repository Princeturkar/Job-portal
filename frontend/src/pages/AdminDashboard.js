import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminDashboard = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [activeTab, setActiveTab] = useState('manage-jobs');
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
    jobType: 'Full Time',
    workMode: 'Remote',
    experience: '0 to 2 years'
  });

  useEffect(() => {
    fetchJobs();
    if (activeTab === 'applications') {
      fetchApplications();
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

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/jobs/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/jobs`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ 
        title: '', 
        company: '', 
        location: '', 
        description: '', 
        salary: '',
        jobType: 'Full Time',
        workMode: 'Remote',
        experience: '0 to 2 years'
      });
      setShowAddForm(false);
      fetchJobs();
      alert('Job added successfully!');
    } catch (error) {
      alert('Failed to add job: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job._id);
    setFormData({
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      description: job.description || '',
      salary: job.salary || '',
      jobType: job.jobType || 'Full Time',
      workMode: job.workMode || 'Remote',
      experience: job.experience || '0 to 2 years'
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/api/jobs/${editingJob}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingJob(null);
      setFormData({ 
        title: '', 
        company: '', 
        location: '', 
        description: '', 
        salary: '',
        jobType: 'Full Time',
        workMode: 'Remote',
        experience: '0 to 2 years'
      });
      fetchJobs();
      alert('Job updated successfully!');
    } catch (error) {
      alert('Failed to update job: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Delete this job?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchJobs();
        alert('Job deleted!');
      } catch (error) {
        alert('Failed to delete job: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/api/jobs/applications/${applicationId}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchApplications(); // Refresh the list
      alert('Application status updated!');
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const cancelEdit = () => {
    setEditingJob(null);
    setShowAddForm(false);
    setFormData({ 
      title: '', 
      company: '', 
      location: '', 
      description: '', 
      salary: '',
      jobType: 'Full Time',
      workMode: 'Remote',
      experience: '0 to 2 years'
    });
  };

  return (
    <div className="container">
      <h2>👨‍💼 Admin Dashboard</h2>
      
      <div className="admin-tabs" style={{marginBottom: '2rem'}}>
        <button 
          onClick={() => setActiveTab('manage-jobs')} 
          className={`btn ${activeTab === 'manage-jobs' ? 'btn-success' : 'btn-secondary'}`}
          style={{marginRight: '1rem'}}
        >
          📋 Manage Jobs
        </button>
        <button 
          onClick={() => setActiveTab('applications')} 
          className={`btn ${activeTab === 'applications' ? 'btn-success' : 'btn-secondary'}`}
          style={{marginRight: '1rem'}}
        >
          📝 All Applications
        </button>
        <button 
          onClick={() => setActiveTab('profile')} 
          className={`btn ${activeTab === 'profile' ? 'btn-success' : 'btn-secondary'}`}
        >
          👤 Profile
        </button>
      </div>

      {activeTab === 'manage-jobs' && (
        <>
          <div className="add-job-section">
            <button 
              onClick={() => setShowAddForm(!showAddForm)} 
              className="add-job-btn"
            >
              {showAddForm ? '✕ Cancel' : '+ Add New Job'}
            </button>
          </div>

          {showAddForm && (
            <div className="job-card" style={{marginBottom: '20px'}}>
              <h3>➕ Add New Job</h3>
              <form onSubmit={handleAdd}>
                <div className="form-group">
                  <label>📝 Title</label>
                  <select value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required>
                    <option value="">Select Job Title</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Data Scientist">Data Scientist</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>🏢 Company</label>
                  <select value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} required>
                    <option value="">Select Company</option>
                    <option value="Google">Google</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Apple">Apple</option>
                    <option value="Meta">Meta</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>📍 Location</label>
                  <select value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required>
                    <option value="">Select Location</option>
                    <option value="New York, NY">New York, NY</option>
                    <option value="San Francisco, CA">San Francisco, CA</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Bangalore, India">Bangalore, India</option>
                    <option value="London, UK">London, UK</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>📁 Job Type</label>
                  <select value={formData.jobType} onChange={(e) => setFormData({...formData, jobType: e.target.value})} required>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>🌐 Work Mode</label>
                  <select value={formData.workMode} onChange={(e) => setFormData({...formData, workMode: e.target.value})} required>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>⏳ Experience</label>
                  <select value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} required>
                    <option value="0 to 2 years">0 to 2 years</option>
                    <option value="2 to 5 years">2 to 5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>💰 Salary</label>
                  <input 
                    type="text" 
                    value={formData.salary} 
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    placeholder="e.g. $100,000 - $120,000"
                  />
                </div>
                <div className="form-group">
                  <label>📄 Description</label>
                  <select value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required>
                    <option value="">Select Job Description</option>
                    <option value="We are looking for a skilled developer to join our team.">Software Developer Role</option>
                    <option value="Join our marketing team to create campaigns.">Marketing Position</option>
                    <option value="We need a creative designer for UI/UX projects.">Design Role</option>
                  </select>
                </div>
                <button type="submit" className="btn">✓ Add Job</button>
                <button type="button" onClick={cancelEdit} className="btn btn-secondary" style={{marginLeft: '10px'}}>✕ Cancel</button>
              </form>
            </div>
          )}

          {jobs.map(job => (
            <div key={job._id} className="job-card">
              {editingJob === job._id ? (
                <form onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label>📝 Title</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>🏢 Company</label>
                    <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>📍 Location</label>
                    <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>📁 Job Type</label>
                    <select value={formData.jobType} onChange={(e) => setFormData({...formData, jobType: e.target.value})} required>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>🌐 Work Mode</label>
                    <select value={formData.workMode} onChange={(e) => setFormData({...formData, workMode: e.target.value})} required>
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>⏳ Experience</label>
                    <select value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} required>
                      <option value="0 to 2 years">0 to 2 years</option>
                      <option value="2 to 5 years">2 to 5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>💰 Salary</label>
                    <input type="text" value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>📄 Description</label>
                    <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                  </div>
                  <button type="submit" className="btn">✓ Update Job</button>
                  <button type="button" onClick={cancelEdit} className="btn btn-secondary" style={{marginLeft: '10px'}}>✕ Cancel</button>
                </form>
              ) : (
              <>
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
                  <p style={{marginTop: '1rem'}}><small>Posted by: {job.admin?.name || 'Admin'}</small></p>
                </div>
                
                <div className="job-actions">
                  <button onClick={() => handleEdit(job)} className="btn">✏️ Edit</button>
                  <button onClick={() => handleDelete(job._id)} className="btn btn-danger">🗑️ Delete</button>
                </div>
              </>
            )}
            </div>
          ))}
        </>
      )}

      {activeTab === 'applications' && (
        <div>
          <h3>📝 All Job Applications</h3>
          <p>Total Applications: {applications.length}</p>
          {applications.length === 0 ? (
            <div className="empty-state">
              <p>No applications yet</p>
            </div>
          ) : (
            applications.map(app => (
              <div key={app._id} className="job-card">
                <h3>{app.jobTitle}</h3>
                <p><strong>Company:</strong> {app.company}</p>
                <p><strong>Applicant:</strong> {app.applicantName}</p>
                <p><strong>Email:</strong> {app.applicantEmail}</p>
                {app.resumeUrl && (
                  <p><strong>Resume:</strong> <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" style={{color: '#4CAF50'}}>📄 View Resume</a></p>
                )}
                <p><strong>Applied on:</strong> {new Date(app.appliedDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> 
                  <select 
                    value={app.status} 
                    onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                    style={{marginLeft: '10px', padding: '5px'}}
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="job-card">
          <h3>👤 Admin Profile</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;