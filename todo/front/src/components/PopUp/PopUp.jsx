import React, { useState } from 'react';

const TaskPopup = ({ isOpen, initialTask, onClose, onSave }) => {
  const [task, setTask] = useState(initialTask);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSave = () => {
    onSave(task);  // Save the updated task
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', width: '300px' }}>
        <h3>Edit Task</h3>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
          style={{ padding: '5px', marginBottom: '10px', width: '100%' }}
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          style={{ padding: '5px', marginBottom: '10px', width: '100%' }}
        />
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          style={{ padding: '5px', marginBottom: '10px', width: '100%' }}
        >
          <option value="TODO">TODO</option>
          <option value="IN PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <div>
          <button onClick={handleSave} style={{ marginRight: '10px' }}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;
