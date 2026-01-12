import React, { useState } from 'react';
import axios from 'axios';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/jobs`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Job posted successfully!');
      setFormData({ title: '', company: '', location: '', description: '', salary: '' });
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to post job');
      setSuccess('');
    }
  };

  return (
    <div className="form-container">
      <h2>Post a Job</h2>
      {success && <div style={{color: 'green', marginBottom: '1rem'}}>{success}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Company:</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Salary (optional):</label>
          <input
            type="text"
            value={formData.salary}
            onChange={(e) => setFormData({...formData, salary: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            rows="4"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="btn">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;