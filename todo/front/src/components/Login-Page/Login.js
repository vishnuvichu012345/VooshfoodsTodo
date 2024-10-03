import React, { useState } from 'react';
import Header from '../NavBar/Header';
import './Login-Page.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { loginUser, loginUserWithGoogle } from '../../services/authService'; // Import your service functions
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password); // Call the login function
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

  // Handle Google login success
  const handleGoogleLogin = async (credentialResponse) => {
    const { credential } = credentialResponse; // Google login credential token
  
    try {
      // Send only the token to the backend
      const data = await loginUserWithGoogle(credential); 
      const { token, user } = data; // Extract JWT token and user info from backend response
  
      // Save the token in localStorage
      localStorage.setItem('token', token);
  
      // Redirect the user to the desired page
      navigate('/todo-list');
    } catch (err) {
      console.error(err);
      // Handle errors
    }
  };
  

  const handleGoogleError = (error) => {
    console.error('Google Login Failed:', error);
    toast.error('Google login failed'); // Show error message
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
          <GoogleLogin
            onSuccess={handleGoogleLogin} // Handle success
            onError={handleGoogleError} // Handle error
          />
        </form>
      </div>
      <ToastContainer /> {/* This will render the toast notifications */}
    </>
  );
};

export default LoginPage;
