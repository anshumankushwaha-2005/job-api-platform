import React, { useEffect, useState } from 'react';
import { getAppliedJobs, updateApplicationStatus } from '../../services/applyApi';

const STATUS_OPTIONS = ['applied', 'interviewing', 'offer', 'rejected'];

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { applications } = await getAppliedJobs();
      setApplications(applications);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load applied jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      setApplications((prev) => prev.map((app) => (app._id === id ? { ...app, status } : app)));
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  if (loading) return <div className="container"><p>Loading applied jobs…</p></div>;

  return (
    <div className="container">
      <h2>Applied Jobs</h2>
      {error && <p className="error-text">{error}</p>}
      {applications.length === 0 && <p>You haven't applied to any jobs yet.</p>}
      {applications.map((app) => (
        <div key={app._id} className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ margin: '0 0 4px' }}>{app.jobTitle}</h3>
              <p style={{ margin: '0 0 4px', color: '#555' }}>
                {app.company} · {app.location}
              </p>
              <span style={{ fontSize: 12, color: '#3a5ce5', textTransform: 'uppercase' }}>
                {app.source}
              </span>
              <p style={{ fontSize: 12, color: '#999', marginTop: 6 }}>
                Applied on {new Date(app.appliedDate).toLocaleDateString()}
              </p>
            </div>
            <select
              className="input"
              style={{ width: 150 }}
              value={app.status}
              onChange={(e) => handleStatusChange(app._id, e.target.value)}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppliedJobs;
