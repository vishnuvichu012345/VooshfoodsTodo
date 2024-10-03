import React, { useState, useEffect } from "react";
import './TaskPopup.css';

const TaskPopup = ({ task, onSave, onClose }) => {
    // Initialize state
    const [editedTask, setEditedTask] = useState(task);

    useEffect(() => {
        // If the task is updated, set the dueDate in the correct format
        if (task) {
            setEditedTask({
                ...task,
                dueDate: task.dueDate ? task.dueDate.slice(0, 16) : "" // Format to YYYY-MM-DDTHH:MM
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the edited task back to the parent
        onSave(editedTask);
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>{task ? "Edit Task" : "View Task"}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Task Title"
                        value={editedTask.title || ""}
                        onChange={handleChange}
                        className="popup-input"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Task Description"
                        value={editedTask.description || ""}
                        onChange={handleChange}
                        className="popup-input"
                        required
                    />
                    <input
                        type="datetime-local"
                        name="dueDate"
                        value={editedTask.dueDate || ""}
                        onChange={handleChange}
                        className="popup-input"
                        required
                    />
                    <div className="popup-actions">
                        <button type="submit" className="popup-button">
                            {task ? "Save Changes" : "Close"}
                        </button>
                        <button type="button" className="popup-button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskPopup;
