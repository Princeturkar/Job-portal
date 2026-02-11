import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState({
    skills: '',
    education: [{ institution: '', degree: '', year: '' }],
    experience: [{ company: '', position: '', duration: '' }],
    socialLinks: { linkedin: '', github: '', portfolio: '' }
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.profile) {
        setProfileData({
          ...res.data.profile,
          skills: res.data.profile.skills.join(', ')
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
      await axios.put('http://localhost:5000/api/users/profile', { profile: updatedProfile }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Profile updated successfully');
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
      const res = await axios.post('http://localhost:5000/api/users/upload-resume', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setResumeUrl(res.data.resumeUrl);
      alert('Resume uploaded successfully');
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Your Profile</h2>
      
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
              value={profileData.socialLinks.linkedin}
              onChange={(e) => setProfileData({...profileData, socialLinks: {...profileData.socialLinks, linkedin: e.target.value}})}
            />
            <input 
              type="text" 
              className="form-control mb-2" 
              placeholder="GitHub"
              value={profileData.socialLinks.github}
              onChange={(e) => setProfileData({...profileData, socialLinks: {...profileData.socialLinks, github: e.target.value}})}
            />
          </div>

          <button type="submit" className="btn btn-success">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
