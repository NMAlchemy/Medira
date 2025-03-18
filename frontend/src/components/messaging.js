import React, { useEffect, useState } from 'react';

function Messaging({ receiverId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/chat/');
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data]);
    };
    return () => socket.close();
  }, []);

  const sendMessage = () => {
    const socket = new WebSocket('ws://localhost:8000/ws/chat/');
    socket.onopen = () => socket.send(JSON.stringify({ message: input, receiver_id: receiverId }));
    setInput('');
  };

  return (
    <div className="container">
      <ul>{messages.map((msg, i) => <li key={i}>{msg.sender}: {msg.message}</li>)}</ul>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Messaging;
