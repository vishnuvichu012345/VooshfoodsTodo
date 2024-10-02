import React from 'react';
import { RiTodoLine } from "react-icons/ri";
import './Header.css'; // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      <RiTodoLine />
      <div className="header-buttons">
        <button className="header-button login-button">Login</button>
        <button className="header-button signup-button">Signup</button>
      </div>
    </header>
  );
};

export default Header;
