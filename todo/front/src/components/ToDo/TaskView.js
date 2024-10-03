import React from "react";
import "./TaskView.css"; 

const TaskView = ({ task, onClose }) => {
  if (!task) return null; 

  return (
    <div className="view-popup">
      <div className="view-popup-content">
        <h2>{task.title}</h2>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}</p>
        <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
        <p><strong>Column:</strong> {task.column}</p>
        <div className="view-popup-actions">
          <button className="view-popup-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
