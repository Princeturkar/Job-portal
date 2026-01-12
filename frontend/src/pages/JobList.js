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
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary || 'Not specified'}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Applications:</strong> {job.applications.length}</p>
            {user && user.role === 'jobseeker' && (
              <button
                onClick={() => applyForJob(job._id)}
                className="btn btn-success"
                disabled={job.applications.includes(user.id)}
              >
                {job.applications.includes(user.id) ? 'Applied' : 'Apply Now'}
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;