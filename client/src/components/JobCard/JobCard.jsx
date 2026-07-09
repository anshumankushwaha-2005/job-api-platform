import React, { useState } from 'react';

const JobCard = ({ job, onApply, applied }) => {
  const [submitting, setSubmitting] = useState(false);
  const [isApplied, setIsApplied] = useState(applied);

  const handleApply = async () => {
    setSubmitting(true);
    try {
      await onApply(job);
      setIsApplied(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ margin: '0 0 4px' }}>{job.title}</h3>
          <p style={{ margin: '0 0 4px', color: '#555' }}>
            {job.company} · {job.location}
          </p>
          <span style={{ fontSize: 12, color: '#3a5ce5', textTransform: 'uppercase' }}>
            {job.source}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
          <a href={job.url} target="_blank" rel="noreferrer" className="btn btn-secondary">
            View
          </a>
          <button
            className="btn"
            onClick={handleApply}
            disabled={isApplied || submitting}
          >
            {isApplied ? 'Applied' : submitting ? 'Applying…' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
