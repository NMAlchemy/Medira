import React, { useState } from 'react';

function EmailSignup() {
  const [email, setEmail] = useState('');

  const subscribe = async () => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:8000/api/send-promo/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
      body: JSON.stringify({ emails: [email] }),
    });
    alert('Subscribed!');
    setEmail('');
  };

  return (
    <div className="container">
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
      <button onClick={subscribe}>Subscribe</button>
    </div>
  );
}

export default EmailSignup;
