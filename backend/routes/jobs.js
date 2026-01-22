const express = require('express');
const Job = require('../models/Job');
const Application = require('../models/Application');
const SavedJob = require('../models/SavedJob');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('admin', 'name');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get admin's jobs
router.get('/my-jobs', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can view their jobs' });
    }
    const jobs = await Job.find({ admin: req.user.userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create job (admins only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can post jobs' });
    }

    const job = new Job({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      description: req.body.description,
      salary: req.body.salary,
      jobType: req.body.jobType,
      workMode: req.body.workMode,
      experience: req.body.experience,
      employer: req.user.userId,
      admin: req.user.userId
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error('Job creation error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update job
router.put('/:id', auth, async (req, res) => {
  try {
    console.log('Update request for job:', req.params.id);
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      description: req.body.description,
      salary: req.body.salary,
      jobType: req.body.jobType,
      workMode: req.body.workMode,
      experience: req.body.experience
    }, { new: true });
    res.json(updatedJob);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete job
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log('Delete request for job:', req.params.id);
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Apply for job
router.post('/:id/apply', auth, async (req, res) => {
  try {
    if (req.user.role !== 'jobseeker') {
      return res.status(403).json({ message: 'Only job seekers can apply' });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      jobId: req.params.id,
      applicantId: req.user.userId
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    // Get user details
    const user = await User.findById(req.user.userId);
    
    // Create application record
    const application = new Application({
      jobId: req.params.id,
      applicantId: req.user.userId,
      jobTitle: job.title,
      company: job.company,
      applicantName: user.name,
      applicantEmail: user.email
    });
    
    await application.save();
    
    // Also add to job's applications array for quick reference
    if (!job.applications.includes(req.user.userId)) {
      job.applications.push(req.user.userId);
      await job.save();
    }

    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Apply error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Save job
router.post('/:id/save', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already saved
    const existingSave = await SavedJob.findOne({
      jobId: req.params.id,
      userId: req.user.userId
    });

    if (existingSave) {
      return res.status(400).json({ message: 'Job already saved' });
    }

    const savedJob = new SavedJob({
      jobId: req.params.id,
      userId: req.user.userId
    });
    
    await savedJob.save();
    res.json({ message: 'Job saved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get saved jobs
router.get('/saved', auth, async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ userId: req.user.userId }).populate('jobId');
    const jobs = savedJobs.map(saved => saved.jobId).filter(job => job !== null);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all applications (admin only)
router.get('/applications', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can view all applications' });
    }
    const applications = await Application.find().populate('jobId').populate('applicantId');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update application status
router.put('/applications/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update application status' });
    }
    
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's applications
router.get('/my-applications', auth, async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.user.userId }).populate('jobId');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;