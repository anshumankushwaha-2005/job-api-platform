const indeedService = require('../services/indeedService');
const techfetchService = require('../services/techfetchService');
const infosysService = require('../services/infosysService');
const capgeminiService = require('../services/capgeminiService');
const randstadService = require('../services/randstadService');

const ALL_SOURCES = {
  indeed: indeedService,
  techfetch: techfetchService,
  infosys: infosysService,
  capgemini: capgeminiService,
  randstad: randstadService,
};

// @route   GET /api/jobs/search?q=&location=&sources=indeed,techfetch
const searchJobs = async (req, res) => {
  try {
    const { q = '', location = '', sources } = req.query;

    const requestedSources = sources
      ? sources.split(',').map((s) => s.trim().toLowerCase()).filter((s) => ALL_SOURCES[s])
      : Object.keys(ALL_SOURCES);

    const settled = await Promise.allSettled(
      requestedSources.map((key) => ALL_SOURCES[key].searchJobs(q, location))
    );

    const jobs = [];
    const errors = [];

    settled.forEach((result, i) => {
      const sourceName = requestedSources[i];
      if (result.status === 'fulfilled') {
        jobs.push(...result.value);
      } else {
        errors.push({ source: sourceName, error: result.reason.message });
      }
    });

    res.status(200).json({ count: jobs.length, jobs, errors });
  } catch (err) {
    res.status(500).json({ message: 'Job search failed', error: err.message });
  }
};

module.exports = { searchJobs };
