const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobId: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      enum: ['indeed', 'techfetch', 'infosys', 'capgemini', 'randstad'],
      required: true,
    },
    jobUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['applied', 'interviewing', 'offer', 'rejected'],
      default: 'applied',
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent the same user from applying to the same job/source twice
applicationSchema.index({ user: 1, jobId: 1, source: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
