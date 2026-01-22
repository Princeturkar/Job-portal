const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, default: 'Full Time' },
  workMode: { type: String, default: 'Remote' },
  experience: { type: String, default: '0 to 2 years' },
  description: { type: String, required: true },
  salary: { type: String },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);