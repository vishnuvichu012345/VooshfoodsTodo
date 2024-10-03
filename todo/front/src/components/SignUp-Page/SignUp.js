import React, { useState } from 'react';
import './SignupForm.css'; // Import the CSS file
import { registerUser } from '../../services/authService';

export default function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const fullName = `${firstName} ${lastName}`;
      const response = await registerUser(fullName, email, password); // Send data to backend
      setSuccess('Registration successful!'); // Handle success response
      console.log('Response from backend:', response);
    } catch (err) {
      setError(err.msg || 'Something went wrong'); // Display error message
      console.error('Error from backend:', err);
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo">Logo</div>
        <div className="header-buttons">
          <button className="header-button login-button">Login</button>
          <button className="header-button signup-button">Signup</button>
        </div>
      </header>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="title">Signup</h2>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <input
            type="text"
            placeholder="First Name"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="button">
            Signup
          </button>
          <p className="text">
            Already have an account? <a href="#" className="link">Login</a>
          </p>
          <button type="button" className="google-button">
            Signup with Google
          </button>
        </form>
      </div>
    </>
  );
}
