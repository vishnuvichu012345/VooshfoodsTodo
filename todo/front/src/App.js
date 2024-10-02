import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login-Page/Login';
import SignupForm from './components/SignUp-Page/SignUp';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
    </Routes>
  </Router>
  )
}

export default App
