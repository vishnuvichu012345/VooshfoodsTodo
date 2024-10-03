import React, { useState } from 'react';
import Header from '../NavBar/Header';
import './Login-Page.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { loginUser } from '../../services/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Debug log
    try {
      const data = await loginUser(email, password); // Call the login function
      console.log(data); // Log the response to check if it contains the token
      const { token } = data; // Extract the token

      // Save the token in localStorage
      localStorage.setItem('token', token);

      // Redirect to the TaskBoard
      navigate('/todo-list');
      toast.success('Login successful!'); // Show success notification
    } catch (err) {
      console.error(err); // Log the error
      toast.error(err.msg || 'Invalid credentials'); // Show error message
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="button">Login</button>
          <p className="paragraph">
            Don't have an account? <a href="/signup" className="link">Signup</a>
          </p>
        </form>
      </div>
      <ToastContainer /> {/* This will render the toast notifications */}
    </>
  );
};

export default LoginPage;
