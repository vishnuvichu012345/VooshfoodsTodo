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

  // Handle Google login success
  const handleGoogleLogin = async (credentialResponse) => {
    console.log('Google Login Success:', credentialResponse);
    const { credential } = credentialResponse; // Get the credential from the response

    // Send the credential to your backend for verification
    try {
      const data = await loginUserWithGoogle(credential); // Use the imported function
      console.log(data); // Log the response to check if it contains the token
      const { token } = data; // Extract the token

      // Save the token in localStorage
      localStorage.setItem('token', token);

      // Redirect to the TaskBoard
      navigate('/todo-list');
      toast.success('Google login successful!'); // Show success notification
    } catch (err) {
      console.error(err); // Log the error
      toast.error(err.msg || 'Google login failed'); // Show error message
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

// Move this function to authService.js
// It’s better to handle API calls in the service file
// export const loginUserWithGoogle = async (token) => {
//   const response = await fetch('/api/auth/google-login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ token }),
//   });
//   if (!response.ok) {
//     throw new Error('Google login failed');
//   }
//   return await response.json();
// };

export default LoginPage;
