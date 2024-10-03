import React from 'react';


const ViewTask = ({ task, onClose }) => {
  return (
    <div className="view-task-popup">
      <h2>Task Details</h2>
      <div>
        <strong>Title:</strong> {task.title}
      </div>
      <div>
        <strong>Description:</strong> {task.description}
      </div>
      <div>
        <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ViewTask;
