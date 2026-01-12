const mongoose = require('mongoose');

const savedJobSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  savedDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('SavedJob', savedJobSchema);