import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
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
    if (user) {
      fetchJobs();
    }
  }, [user]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log('Adding job:', formData);
      const response = await axios.post('http://localhost:5000/api/jobs', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Job added:', response.data);
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
      console.error('Add job error:', error.response?.data);
      alert('Failed to add job: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (job) => {
    console.log('Editing job:', job);
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
      console.log('Updating job:', editingJob, formData);
      const response = await axios.put(`http://localhost:5000/api/jobs/${editingJob}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Job updated:', response.data);
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
      console.error('Update job error:', error.response?.data);
      alert('Failed to update job: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (jobId) => {
    console.log('Deleting job:', jobId);
    if (window.confirm('Delete this job?')) {
      try {
        const token = localStorage.getItem('token');
        console.log('Delete request with token:', token ? 'Present' : 'Missing');
        const response = await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Delete response:', response.data);
        fetchJobs();
        alert('Job deleted!');
      } catch (error) {
        console.error('Delete error:', error.response?.data);
        alert('Failed to delete job: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Applying to job:', jobId, 'User role:', user?.role);
      const response = await axios.post(`http://localhost:5000/api/jobs/${jobId}/apply`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Application response:', response.data);
      fetchJobs();
      alert('Applied successfully!');
    } catch (error) {
      console.error('Apply error:', error.response?.data);
      alert(error.response?.data?.message || 'Application failed');
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

  const isMyJob = (job) => {
    if (!user || !job.employer) return false;
    // Handle both populated and non-populated employer field
    const employerId = typeof job.employer === 'object' ? job.employer._id : job.employer;
    console.log('Checking job ownership:', { employerId, userId: user.id, userRole: user.role });
    return employerId === user.id;
  };

  return (
    <div className="container">
      <h2>🏢 Job Dashboard</h2>
      
      {user?.role === 'admin' && (
        <div className="add-job-section">
          <button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="add-job-btn"
          >
            {showAddForm ? '✕ Cancel' : '+ Add New Job'}
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="job-card" style={{marginBottom: '20px'}}>
          <h3>➕ Add New Job</h3>
          <form onSubmit={handleAdd}>
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
                <option value="Worldwide">Worldwide</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="form-group">
              <label>📁 Job Type</label>
              <select
                value={formData.jobType}
                onChange={(e) => setFormData({...formData, jobType: e.target.value})}
                required
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="form-group">
              <label>🌐 Work Mode</label>
              <select
                value={formData.workMode}
                onChange={(e) => setFormData({...formData, workMode: e.target.value})}
                required
              >
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="form-group">
              <label>⏳ Experience</label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                required
              >
                <option value="0 to 2 years">0 to 2 years</option>
                <option value="2 to 5 years">2 to 5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
            <div className="form-group">
              <label>💰 Salary / Compensation</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                placeholder="e.g. INR 18 LPA CTC"
              />
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
            <button type="button" onClick={cancelEdit} className="btn btn-secondary" style={{marginLeft: '10px'}}>✕ Cancel</button>
          </form>
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="empty-state">
          <p>💼 No jobs available yet</p>
          {user?.role === 'admin' && <p>Click "Add New Job" to post your first job!</p>}
        </div>
      ) : (
        jobs.map(job => (
          <div key={job._id} className="job-card">
            {editingJob === job._id ? (
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label>📝 Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Job Title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>🏢 Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Company"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>📍 Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Location"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>📁 Job Type</label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => setFormData({...formData, jobType: e.target.value})}
                    required
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>🌐 Work Mode</label>
                  <select
                    value={formData.workMode}
                    onChange={(e) => setFormData({...formData, workMode: e.target.value})}
                    required
                  >
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>⏳ Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    required
                  >
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
                    placeholder="Salary"
                  />
                </div>
                <div className="form-group">
                  <label>📄 Description</label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Description"
                    required
                  />
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
                </div>

                <div className="job-description-section">
                  <h4>Job Description</h4>
                  <p>{job.description}</p>
                </div>
                
                <div className="job-actions">
                  {user?.role === 'admin' && (
                    <>
                      <button onClick={() => handleEdit(job)} className="btn">✏️ Edit</button>
                      <button 
                        onClick={() => handleDelete(job._id)} 
                        className="btn btn-danger"
                      >
                        🗑️ Delete
                      </button>
                    </>
                  )}
                  {user?.role === 'jobseeker' && (
                    <button
                      onClick={() => handleApply(job._id)}
                      className="apply-btn-large"
                      disabled={job.applications.includes(user.id)}
                    >
                      {job.applications.includes(user.id) ? '✅ Applied' : 'Apply Now'}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;