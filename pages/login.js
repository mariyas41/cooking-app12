// pages/login.js

import React, { useState } from 'react';
import Router from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('session_id', data.sessionId);
      window.location.href = '/';
    } else {
      setErrorMessage(data.message || 'Login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit" style={{ backgroundColor: '#dd3895', color: 'white' }}>Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default Login;
