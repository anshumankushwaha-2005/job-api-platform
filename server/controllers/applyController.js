const Application = require('../models/Application');

// @route   POST /api/apply
const applyToJob = async (req, res) => {
  try {
    const { jobId, jobTitle, company, location, source, jobUrl } = req.body;

    if (!jobId || !jobTitle || !company || !source) {
      return res
        .status(400)
        .json({ message: 'jobId, jobTitle, company, and source are required' });
    }

    const existing = await Application.findOne({ user: req.user.id, jobId, source });
    if (existing) {
      return res.status(409).json({ message: 'You have already applied to this job' });
    }

    const application = await Application.create({
      user: req.user.id,
      jobId,
      jobTitle,
      company,
      location,
      source,
      jobUrl,
    });

    res.status(201).json({ application });
  } catch (err) {
    res.status(500).json({ message: 'Failed to record application', error: err.message });
  }
};

// @route   GET /api/apply
const getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id }).sort({ appliedDate: -1 });
    res.status(200).json({ count: applications.length, applications });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications', error: err.message });
  }
};

// @route   PATCH /api/apply/:id/status
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['applied', 'interviewing', 'offer', 'rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ application });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update application', error: err.message });
  }
};

module.exports = { applyToJob, getAppliedJobs, updateApplicationStatus };
