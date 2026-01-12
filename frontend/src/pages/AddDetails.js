import React, { useState } from 'react';
import axios from 'axios';

const AddDetails = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/jobs', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ title: '', company: '', location: '', description: '', salary: '' });
      alert('Job added successfully!');
    } catch (error) {
      alert('Failed to add job: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container">
      <h2>➕ Add Job Details</h2>
      
      <div className="job-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>📝 Title</label>
            <select
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            >
              <option value="">Select Job Title</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Product Manager">Product Manager</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Marketing Manager">Marketing Manager</option>
              <option value="Sales Executive">Sales Executive</option>
            </select>
          </div>

          <div className="form-group">
            <label>🏢 Company</label>
            <select
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              required
            >
              <option value="">Select Company</option>
              <option value="Google">Google</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Amazon">Amazon</option>
              <option value="Apple">Apple</option>
              <option value="Meta">Meta</option>
              <option value="Netflix">Netflix</option>
              <option value="Tesla">Tesla</option>
              <option value="Uber">Uber</option>
              <option value="Airbnb">Airbnb</option>
              <option value="Spotify">Spotify</option>
            </select>
          </div>

          <div className="form-group">
            <label>📍 Location</label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            >
              <option value="">Select Location</option>
              <option value="New York, NY">New York, NY</option>
              <option value="San Francisco, CA">San Francisco, CA</option>
              <option value="Los Angeles, CA">Los Angeles, CA</option>
              <option value="Seattle, WA">Seattle, WA</option>
              <option value="Austin, TX">Austin, TX</option>
              <option value="Chicago, IL">Chicago, IL</option>
              <option value="Boston, MA">Boston, MA</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="form-group">
            <label>💰 Salary</label>
            <select
              value={formData.salary}
              onChange={(e) => setFormData({...formData, salary: e.target.value})}
            >
              <option value="">Select Salary Range</option>
              <option value="$40,000 - $60,000">$40,000 - $60,000</option>
              <option value="$60,000 - $80,000">$60,000 - $80,000</option>
              <option value="$80,000 - $100,000">$80,000 - $100,000</option>
              <option value="$100,000 - $120,000">$100,000 - $120,000</option>
              <option value="$120,000 - $150,000">$120,000 - $150,000</option>
              <option value="$150,000 - $200,000">$150,000 - $200,000</option>
              <option value="$200,000+">$200,000+</option>
              <option value="Competitive">Competitive</option>
              <option value="Negotiable">Negotiable</option>
            </select>
          </div>

          <div className="form-group">
            <label>📄 Description</label>
            <select
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            >
              <option value="">Select Job Description</option>
              <option value="We are looking for a skilled developer to join our team. Responsibilities include coding, testing, and maintaining applications.">Software Developer Role</option>
              <option value="Join our marketing team to create campaigns, analyze market trends, and drive brand awareness.">Marketing Position</option>
              <option value="We need a creative designer to work on user interfaces, user experience, and visual design projects.">Design Role</option>
              <option value="Looking for a data professional to analyze datasets, create reports, and provide business insights.">Data Analysis Role</option>
              <option value="Seeking a project manager to coordinate teams, manage timelines, and ensure successful project delivery.">Management Position</option>
              <option value="Customer service representative needed to handle inquiries, resolve issues, and maintain client relationships.">Customer Service Role</option>
              <option value="Sales professional required to generate leads, close deals, and build client relationships.">Sales Position</option>
              <option value="HR specialist needed to manage recruitment, employee relations, and organizational development.">HR Role</option>
            </select>
          </div>

          <button type="submit" className="btn">✓ Add Job</button>
        </form>
      </div>
    </div>
  );
};

export default AddDetails;