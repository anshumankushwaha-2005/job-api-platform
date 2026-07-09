import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAppliedJobs } from '../../services/applyApi';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({ total: 0, applied: 0, interviewing: 0, offer: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { applications } = await getAppliedJobs();
        const counts = { total: applications.length, applied: 0, interviewing: 0, offer: 0, rejected: 0 };
        applications.forEach((app) => {
          counts[app.status] = (counts[app.status] || 0) + 1;
        });
        setStats(counts);
      } catch (err) {
        console.error('Failed to load dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="container">
      <h2>Welcome{user?.name ? `, ${user.name}` : ''}!</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, margin: '20px 0' }}>
        <StatCard label="Total Applications" value={stats.total} />
        <StatCard label="Applied" value={stats.applied} />
        <StatCard label="Interviewing" value={stats.interviewing} />
        <StatCard label="Offers" value={stats.offer} />
        <StatCard label="Rejected" value={stats.rejected} />
      </div>
      {loading && <p>Loading your stats…</p>}
      <div style={{ display: 'flex', gap: 12 }}>
        <Link className="btn" to="/jobs">Search Jobs</Link>
        <Link className="btn btn-secondary" to="/applied">View Applied Jobs</Link>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="card" style={{ textAlign: 'center' }}>
    <div style={{ fontSize: 26, fontWeight: 700 }}>{value}</div>
    <div style={{ fontSize: 13, color: '#666' }}>{label}</div>
  </div>
);

export default Dashboard;
