import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Logged In:', data);
        onLogin(data.user.username); // Pass the username received from the server
      } else {
        setErrorMessage(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed');
    }
  };

  return (
    <div>
      <h2 className='text_content'>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input className='login_content' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required /><br/>
        <input className='login_content' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
