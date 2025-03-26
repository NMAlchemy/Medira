import React, { useState } from 'react';
import styles from './Login.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Example API call
    console.log('Logging in with:', { username, password });
  };

  return (
    <form className={styles.loginContainer} onSubmit={handleLogin}>
      <h2 className={styles.title}>Login</h2>
      <input
        className={styles.inputField}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        className={styles.inputField}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button className={styles.loginButton} type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
