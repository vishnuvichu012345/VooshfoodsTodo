import React, { useState } from 'react';
import Header from '../NavBar/Header';
import './Login-Page.css'; // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted with:', email, password);
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
          <button
            type="button"
            onClick={() => console.log('Login with Google clicked')}
            className="button"
          >
            Login with Google
          </button>
          <p className="paragraph">
            Don't have an account? <a href="/signup" className="link">Signup</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
