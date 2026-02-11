import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageJobs = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: ''
  });

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/jobs/my-jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job._id);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      salary: job.salary || ''
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/jobs/${editingJob}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingJob(null);
      fetchMyJobs();
      alert('Job updated successfully!');
    } catch (error) {
      alert('Failed to update job');
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchMyJobs();
        alert('Job deleted successfully!');
      } catch (error) {
        alert('Failed to delete job');
      }
    }
  };

  const cancelEdit = () => {
    setEditingJob(null);
    setFormData({ title: '', company: '', location: '', description: '', salary: '' });
  };

  return (
    <div className="container">
      <h2>Manage My Jobs</h2>
      {jobs.length === 0 ? (
        <p style={{color: 'white', textAlign: 'center'}}>No jobs posted yet</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} className="job-card">
            {editingJob === job._id ? (
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Job Title"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Company"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Location"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    placeholder="Salary"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Description"
                    required
                  />
                </div>
                <button type="submit" className="btn">Update</button>
                <button type="button" onClick={cancelEdit} className="btn" style={{marginLeft: '10px', background: '#666'}}>Cancel</button>
              </form>
            ) : (
              <>
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary || 'Not specified'}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Applications:</strong> {job.applications.length}</p>
                <div style={{marginTop: '10px'}}>
                  <button onClick={() => handleEdit(job)} className="btn">Edit</button>
                  <button 
                    onClick={() => handleDelete(job._id)} 
                    className="btn" 
                    style={{marginLeft: '10px', background: '#f44336'}}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ManageJobs;