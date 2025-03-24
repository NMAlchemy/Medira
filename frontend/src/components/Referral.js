import React, { useState } from 'react';

function Referral() {
  const [email, setEmail] = useState('');

  const refer = async () => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:8000/api/referral/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
      body: JSON.stringify({ referred_email: email }),
    });
    alert('Referral sent!');
    setEmail('');
  };

  return (
    <div className="container">
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Friend’s email" />
      <button onClick={refer}>Refer</button>
    </div>
  );
}

export default Referral;
