const axios = require('axios');

const searchJobs = async (query = '', location = '') => {
  const apiKey = process.env.RANDSTAD_API_KEY;

  if (!apiKey) {
    return mockResults(query, location);
  }

  try {
    const response = await axios.get('https://api.randstad.com/v1/jobs/search', {
      headers: { Authorization: `Bearer ${apiKey}` },
      params: { keywords: query, location },
    });
    return normalize(response.data);
  } catch (err) {
    console.error('Randstad API error, falling back to mock data:', err.message);
    return mockResults(query, location);
  }
};

const normalize = (data) => {
  const jobs = data.jobs || [];
  return jobs.map((job) => ({
    id: job.jobId,
    title: job.jobTitle,
    company: job.clientName || 'Randstad',
    location: job.location,
    url: job.jobUrl,
    source: 'randstad',
  }));
};

const mockResults = (query, location) => [
  {
    id: 'randstad-5001',
    title: `${query || 'Recruitment Coordinator'}`,
    company: 'Randstad',
    location: location || 'Atlanta, GA',
    url: 'https://randstad.com/jobs/5001',
    source: 'randstad',
  },
  {
    id: 'randstad-5002',
    title: `${query || 'Staffing Specialist'}`,
    company: 'Randstad',
    location: location || 'Remote',
    url: 'https://randstad.com/jobs/5002',
    source: 'randstad',
  },
];

module.exports = { searchJobs };
