const axios = require('axios');

const searchJobs = async (query = '', location = '') => {
  const apiKey = process.env.CAPGEMINI_API_KEY;

  if (!apiKey) {
    return mockResults(query, location);
  }

  try {
    const response = await axios.get('https://api.capgemini.com/careers/v1/jobs', {
      headers: { Authorization: `Bearer ${apiKey}` },
      params: { q: query, location },
    });
    return normalize(response.data);
  } catch (err) {
    console.error('Capgemini API error, falling back to mock data:', err.message);
    return mockResults(query, location);
  }
};

const normalize = (data) => {
  const jobs = data.results || [];
  return jobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: 'Capgemini',
    location: job.location,
    url: job.url,
    source: 'capgemini',
  }));
};

const mockResults = (query, location) => [
  {
    id: 'capgemini-4001',
    title: `${query || 'Business Analyst'}`,
    company: 'Capgemini',
    location: location || 'Chicago, IL',
    url: 'https://capgemini.com/careers/job/4001',
    source: 'capgemini',
  },
  {
    id: 'capgemini-4002',
    title: `${query || 'Business Analyst'} - Digital`,
    company: 'Capgemini',
    location: location || 'Remote',
    url: 'https://capgemini.com/careers/job/4002',
    source: 'capgemini',
  },
];

module.exports = { searchJobs };
