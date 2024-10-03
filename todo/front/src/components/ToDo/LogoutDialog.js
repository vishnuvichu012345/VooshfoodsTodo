import React from "react";
import "./LogoutDialog.css"; 

const LogoutDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-dialog">
      <div className="dialog-content">
        <h3>Are you sure you want to logout?</h3>
        <div className="dialog-buttons">
          <button className="dialog-button confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="dialog-button cancel" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;
