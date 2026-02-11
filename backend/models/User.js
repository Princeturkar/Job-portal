const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['jobseeker', 'admin'], default: 'jobseeker' },
  profile: {
    skills: [String],
    education: [{
      institution: String,
      degree: String,
      year: String
    }],
    experience: [{
      company: String,
      position: String,
      duration: String
    }],
    socialLinks: {
      linkedin: String,
      github: String,
      portfolio: String
    },
    resumeUrl: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);