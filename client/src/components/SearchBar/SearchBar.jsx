import React, { useState } from 'react';

const SOURCES = ['indeed', 'techfetch', 'infosys', 'capgemini', 'randstad'];

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedSources, setSelectedSources] = useState(SOURCES);

  const toggleSource = (source) => {
    setSelectedSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ q: query, location, sources: selectedSources.join(',') });
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <input
          className="input"
          style={{ flex: 2, minWidth: 180 }}
          placeholder="Job title or keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          className="input"
          style={{ flex: 1, minWidth: 140 }}
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {SOURCES.map((source) => (
          <label key={source} style={{ fontSize: 13, display: 'flex', gap: 6, alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={selectedSources.includes(source)}
              onChange={() => toggleSource(source)}
            />
            {source}
          </label>
        ))}
      </div>
    </form>
  );
};

export default SearchBar;
