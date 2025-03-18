import React, { useState } from 'react';

function Verification() {
  const [file, setFile] = useState(null);

  const submitVerification = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('document', file);
    formData.append('artisan', 1); // Replace with logged-in artisan ID
    await fetch('http://localhost:8000/api/verify/', {
      method: 'POST',
      headers: { 'Authorization': `Token ${token}` },
      body: formData,
    });
    alert('Verification submitted!');
  };

  return (
    <div className="container">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={submitVerification}>Submit</button>
    </div>
  );
}

export default Verification;
