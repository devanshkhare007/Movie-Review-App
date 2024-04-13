
// SignIn.js
import React, { useState } from 'react';

const SignIn = ({ togglePopup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Signed In:', data);
        togglePopup();
      } else {
        setErrorMessage(data.error || 'Sign-in failed');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setErrorMessage('Sign-in failed');
    }
  };

  return (
    <div>
      <h2 className='text_content'>Sign In</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        {/* <label>Username:</label> */}
        <input className='user_input' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required /><br/>
        {/* <label>Email:</label> */}
        <input className='user_input' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required /><br/>
        {/* <label>Password:</label> */}
        <input className='user_input' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
        <button className='sign_in_button' type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
