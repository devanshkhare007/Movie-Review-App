import React, { useState } from 'react';
import SignIn from './signin.js';
import Login from './login.js';
import './common.css'; // Import CSS file for styling

const AuthenticationPopup = ({ togglePopup }) => {
  const [showSignIn, setShowSignIn] = useState(true);

  const closePopup = () => {
    togglePopup();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="auth-options">
          <button className='auth_button' onClick={() => setShowSignIn(true)}>Sign In</button>
          <button className='auth_button' onClick={() => setShowSignIn(false)}>Log In</button>
        </div>
        <button className="close-btn" onClick={closePopup}><b>X</b></button>
        {showSignIn ? (
          <SignIn togglePopup={togglePopup} />
        ) : (
          <Login togglePopup={togglePopup} />
        )}
      </div>
    </div>
  );
};

export default AuthenticationPopup;
