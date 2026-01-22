import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyForJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/jobs/${jobId}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Application submitted successfully!');
      fetchJobs();
    } catch (error) {
      alert(error.response?.data?.message || 'Application failed');
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        jobs.map(job => (
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
            
            {user && user.role === 'jobseeker' && (
              <button
                onClick={() => applyForJob(job._id)}
                className="apply-btn-large"
                disabled={job.applications.includes(user.id)}
              >
                {job.applications.includes(user.id) ? '✅ Applied' : 'Apply Now'}
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;