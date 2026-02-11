import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    skills: '',
    education: [{ institution: '', degree: '', year: '' }],
    experience: [{ company: '', position: '', duration: '' }],
    socialLinks: { linkedin: '', github: '', portfolio: '' }
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resumeUrl, setResumeUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.profile) {
        setProfileData({
          skills: res.data.profile.skills?.join(', ') || '',
          education: res.data.profile.education || [{ institution: '', degree: '', year: '' }],
          experience: res.data.profile.experience || [{ company: '', position: '', duration: '' }],
          socialLinks: res.data.profile.socialLinks || { linkedin: '', github: '', portfolio: '' }
        });
        setResumeUrl(res.data.profile.resumeUrl);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const updatedProfile = {
        ...profileData,
        skills: profileData.skills.split(',').map(s => s.trim())
      };
      await axios.put(`${API_URL}/api/users/profile`, { profile: updatedProfile }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccessMessage('✅ Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resume) return;
    const formData = new FormData();
    formData.append('resume', resume);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/api/users/upload-resume`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setResumeUrl(res.data.resumeUrl);
      setResume(null);
      setSuccessMessage('✅ Resume uploaded successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2>Your Profile</h2>
        <button onClick={() => navigate('/')} className="btn" style={{background: '#666'}}>← Back to Dashboard</button>
      </div>
      
      {successMessage && (
        <div style={{
          padding: '15px',
          marginBottom: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          borderRadius: '5px',
          textAlign: 'center',
          fontSize: '16px'
        }}>
          {successMessage}
        </div>
      )}
      
      <div className="card p-4 mb-4">
        <h3>Resume Management</h3>
        {resumeUrl && (
          <p>Current Resume: <a href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>
        )}
        <form onSubmit={handleResumeUpload}>
          <div className="mb-3">
            <input type="file" className="form-control" onChange={(e) => setResume(e.target.files[0])} accept=".pdf,.doc,.docx" />
          </div>
          <button type="submit" className="btn btn-primary">Upload New Resume</button>
        </form>
      </div>

      <div className="card p-4">
        <h3>Professional Details</h3>
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-3">
            <label className="form-label">Skills (comma separated)</label>
            <input 
              type="text" 
              className="form-control" 
              value={profileData.skills} 
              onChange={(e) => setProfileData({...profileData, skills: e.target.value})}
            />
          </div>
          
          <h4>Social Links</h4>
          <div className="mb-3">
            <input 
              type="text" 
              className="form-control mb-2" 
              placeholder="LinkedIn"
              value={profileData.socialLinks?.linkedin || ''}
              onChange={(e) => setProfileData({...profileData, socialLinks: {...(profileData.socialLinks || {}), linkedin: e.target.value}})}
            />
            <input 
              type="text" 
              className="form-control mb-2" 
              placeholder="GitHub"
              value={profileData.socialLinks?.github || ''}
              onChange={(e) => setProfileData({...profileData, socialLinks: {...(profileData.socialLinks || {}), github: e.target.value}})}
            />
          </div>

          <button type="submit" className="btn btn-success">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
