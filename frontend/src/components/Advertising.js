import React, { useState } from 'react';

function Advertising() {
  const [tier, setTier] = useState('basic');

  const purchaseAd = async () => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:8000/api/advertise/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
      body: JSON.stringify({ tier }),
    });
    alert('Ad purchased!');
  };

  return (
    <div className="container">
      <select value={tier} onChange={(e) => setTier(e.target.value)}>
        <option value="basic">Basic</option>
        <option value="premium">Premium</option>
      </select>
      <button onClick={purchaseAd}>Purchase Ad</button>
    </div>
  );
}

export default Advertising;
