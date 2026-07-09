const express = require('express');
const {
  applyToJob,
  getAppliedJobs,
  updateApplicationStatus,
} = require('../controllers/applyController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, applyToJob);
router.get('/', protect, getAppliedJobs);
router.patch('/:id/status', protect, updateApplicationStatus);

module.exports = router;
