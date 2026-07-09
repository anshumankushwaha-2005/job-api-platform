const axios = require('axios');

const searchJobs = async (query = '', location = '') => {
  const apiKey = process.env.INFOSYS_API_KEY;

  if (!apiKey) {
    return mockResults(query, location);
  }

  try {
    const response = await axios.get('https://api.infosys.com/careers/v1/jobs', {
      headers: { Authorization: `Bearer ${apiKey}` },
      params: { keyword: query, location },
    });
    return normalize(response.data);
  } catch (err) {
    console.error('Infosys API error, falling back to mock data:', err.message);
    return mockResults(query, location);
  }
};

const normalize = (data) => {
  const jobs = data.jobPostings || [];
  return jobs.map((job) => ({
    id: job.jobId,
    title: job.title,
    company: 'Infosys',
    location: job.location,
    url: job.applyLink,
    source: 'infosys',
  }));
};

const mockResults = (query, location) => [
  {
    id: 'infosys-3001',
    title: `${query || 'Systems Engineer'}`,
    company: 'Infosys',
    location: location || 'Bengaluru, India',
    url: 'https://infosys.com/careers/job/3001',
    source: 'infosys',
  },
  {
    id: 'infosys-3002',
    title: `${query || 'Systems Engineer'} - Consulting`,
    company: 'Infosys',
    location: location || 'Indianapolis, IN',
    url: 'https://infosys.com/careers/job/3002',
    source: 'infosys',
  },
];

module.exports = { searchJobs };
