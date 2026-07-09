import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import JobCard from '../../components/JobCard/JobCard';
import { searchJobs } from '../../services/jobApi';
import { applyToJob } from '../../services/applyApi';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (params) => {
    setLoading(true);
    setError('');
    try {
      const data = await searchJobs(params);
      setJobs(data.jobs);
      setSearched(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Job search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (job) => {
    await applyToJob({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      source: job.source,
      jobUrl: job.url,
    });
  };

  return (
    <div className="container">
      <h2>Job Search</h2>
      <p style={{ color: '#666', marginTop: -6 }}>
        Search across Indeed, TechFetch, Infosys, Capgemini, and Randstad at once.
      </p>
      <SearchBar onSearch={handleSearch} loading={loading} />
      {error && <p className="error-text">{error}</p>}
      {searched && !loading && jobs.length === 0 && <p>No jobs found. Try a different search.</p>}
      {jobs.map((job) => (
        <JobCard key={`${job.source}-${job.id}`} job={job} onApply={handleApply} />
      ))}
    </div>
  );
};

export default JobSearch;
