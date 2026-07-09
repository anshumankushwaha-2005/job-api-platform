const axios = require('axios');

/**
 * Indeed job search service.
 * If INDEED_API_KEY is configured, this is where a real call to Indeed's
 * Publisher/Partner API would be made. Without credentials, it returns
 * realistic mock data so the rest of the platform can be built and tested.
 */
const searchJobs = async (query = '', location = '') => {
  const apiKey = process.env.INDEED_API_KEY;

  if (!apiKey) {
    return mockResults(query, location);
  }

  try {
    // Example shape only — replace with Indeed's actual endpoint/params.
    const response = await axios.get('https://api.indeed.com/ads/apisearch', {
      params: { publisher: apiKey, q: query, l: location, format: 'json', v: 2 },
    });
    return normalize(response.data);
  } catch (err) {
    console.error('Indeed API error, falling back to mock data:', err.message);
    return mockResults(query, location);
  }
};

const normalize = (data) => {
  const results = data.results || [];
  return results.map((job) => ({
    id: job.jobkey,
    title: job.jobtitle,
    company: job.company,
    location: job.formattedLocation,
    url: job.url,
    source: 'indeed',
  }));
};

const mockResults = (query, location) => [
  {
    id: 'indeed-1001',
    title: `${query || 'Software Engineer'}`,
    company: 'Acme Corp',
    location: location || 'Remote',
    url: 'https://indeed.com/viewjob?jk=1001',
    source: 'indeed',
  },
  {
    id: 'indeed-1002',
    title: `Senior ${query || 'Software Engineer'}`,
    company: 'Globex Inc',
    location: location || 'New York, NY',
    url: 'https://indeed.com/viewjob?jk=1002',
    source: 'indeed',
  },
];

module.exports = { searchJobs };
