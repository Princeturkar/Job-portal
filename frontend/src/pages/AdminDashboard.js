import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    salary: ''
  });

  useEffect(() => {
    fetchJobs();
    if (activeTab === 'applications') {
      fetchApplications();
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

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/jobs/applications', {
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
      await axios.post('http://localhost:5000/api/jobs', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ title: '', company: '', location: '', description: '', salary: '' });
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
      salary: job.salary || ''
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/jobs/${editingJob}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingJob(null);
      setFormData({ title: '', company: '', location: '', description: '', salary: '' });
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
        await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
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
      await axios.put(`http://localhost:5000/api/jobs/applications/${applicationId}`, 
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
    setFormData({ title: '', company: '', location: '', description: '', salary: '' });
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
                  </select>
                </div>
                <div className="form-group">
                  <label>💰 Salary</label>
                  <select value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})}>
                    <option value="">Select Salary Range</option>
                    <option value="$60,000 - $80,000">$60,000 - $80,000</option>
                    <option value="$80,000 - $100,000">$80,000 - $100,000</option>
                    <option value="$100,000 - $120,000">$100,000 - $120,000</option>
                  </select>
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
                    <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <input type="text" value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                  </div>
                  <button type="submit" className="btn">✓ Update Job</button>
                  <button type="button" onClick={cancelEdit} className="btn btn-secondary" style={{marginLeft: '10px'}}>✕ Cancel</button>
                </form>
              ) : (
                <>
                  <h3>{job.title}</h3>
                  <p><strong>Company:</strong> {job.company}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Salary:</strong> {job.salary || 'Not specified'}</p>
                  <p><strong>Description:</strong> {job.description}</p>
                  <p><strong>Posted by:</strong> {job.admin?.name || 'Admin'}</p>
                  <p><strong>Applications:</strong> {job.applications.length}</p>
                  
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