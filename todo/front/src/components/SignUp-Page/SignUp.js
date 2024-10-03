import React, { useState } from 'react';
import './SignupForm.css';
import { registerUser } from '../../services/authService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const fullName = `${firstName} ${lastName}`;
      const response = await registerUser(fullName, email, password);
      setSuccess('Registration successful!');
      toast.success('Registration successful!');

      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate('/'); // Redirect to login page
      }, 2000); // Wait for 2 seconds before redirecting
    } catch (err) {
      if (err.errors) {
        err.errors.forEach((error) => toast.error(error.msg));
      } else {
        toast.error(err.msg || 'Something went wrong');
      }
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
            Already have an account? <a href="/" className="link">Login</a>
          </p>
          <button type="button" className="google-button">
            Signup with Google
          </button>
        </form>
      </div>

      <ToastContainer />
    </>
  );
}
