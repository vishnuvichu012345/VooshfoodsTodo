import React from 'react';

const TaskPopup = ({ task, onSave, onClose }) => {
  const [editedTask, setEditedTask] = React.useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <div className="edit-task-popup">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate.split('T')[0]} // Format to YYYY-MM-DD
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default TaskPopup;
