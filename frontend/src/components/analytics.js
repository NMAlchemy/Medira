import React, { useEffect, useState } from 'react';

function Analytics() {
  const [data, setData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/api/analytics/', {
      headers: { 'Authorization': `Token ${token}` },
    })
      .then((res) => res.json())
      .then(setData);
  }, []);

  return <div className="container">Total Bookings: {data.total_bookings}</div>;
}

export default Analytics;
