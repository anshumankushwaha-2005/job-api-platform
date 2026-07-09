const express = require('express');
const { searchJobs } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/search', protect, searchJobs);

module.exports = router;
