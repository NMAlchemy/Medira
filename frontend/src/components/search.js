import React, { useState } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/api/search/?q=${query}&location=${location}`, {
      headers: { 'Authorization': `Token ${token}` },
    });
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="container">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Skill (e.g., electronics)" />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
      <button onClick={handleSearch}>Search</button>
      <ul>{results.map((artisan) => <li key={artisan.id}>{artisan.username} - {artisan.location}</li>)}</ul>
    </div>
  );
}

export default Search;
