import React, { useState } from 'react';

function Logistics({ artisanId }) {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');

  const requestPickup = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/api/logistics/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
      body: JSON.stringify({ from_address: fromAddress, to_address: toAddress, artisan_name: 'Artisan' }),
    });
    const data = await response.json();
    alert(`Tracking: ${data.tracking_url}`);
  };

  return (
    <div className="container">
      <input value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} placeholder="Your Address" />
      <input value={toAddress} onChange={(e) => setToAddress(e.target.value)} placeholder="Artisan Address" />
      <button onClick={requestPickup}>Request Pickup</button>
    </div>
  );
}

export default Logistics;
