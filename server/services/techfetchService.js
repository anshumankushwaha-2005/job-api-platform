const axios = require('axios');

const searchJobs = async (query = '', location = '') => {
  const apiKey = process.env.TECHFETCH_API_KEY;

  if (!apiKey) {
    return mockResults(query, location);
  }

  try {
    const response = await axios.get('https://api.techfetch.com/v1/jobs/search', {
      headers: { Authorization: `Bearer ${apiKey}` },
      params: { q: query, location },
    });
    return normalize(response.data);
  } catch (err) {
    console.error('TechFetch API error, falling back to mock data:', err.message);
    return mockResults(query, location);
  }
};

const normalize = (data) => {
  const jobs = data.jobs || [];
  return jobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.employer,
    location: job.location,
    url: job.applyUrl,
    source: 'techfetch',
  }));
};

const mockResults = (query, location) => [
  {
    id: 'techfetch-2001',
    title: `${query || 'Full Stack Developer'}`,
    company: 'TechNova Solutions',
    location: location || 'Austin, TX',
    url: 'https://techfetch.com/job/2001',
    source: 'techfetch',
  },
  {
    id: 'techfetch-2002',
    title: `${query || 'Full Stack Developer'} (Contract)`,
    company: 'Bright Systems',
    location: location || 'Remote',
    url: 'https://techfetch.com/job/2002',
    source: 'techfetch',
  },
];

module.exports = { searchJobs };
