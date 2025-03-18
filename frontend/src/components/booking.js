import React, { useState } from 'react';

function Booking({ artisanId }) {
  const [date, setDate] = useState('');

  const bookArtisan = async () => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:8000/api/bookings/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
      body: JSON.stringify({ consumer: 1, artisan: artisanId, date }), // Replace consumer ID dynamically
    });
    alert('Booking created!');
  };

  return (
    <div className="container">
      <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={bookArtisan}>Book</button>
    </div>
  );
}

export default Booking;
