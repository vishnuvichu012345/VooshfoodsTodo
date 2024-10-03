import React from 'react'

const AddTask = ({addTask,newTask,handleNewTaskChange,closeAddTaskPopup}) => {
  return (
    <div className="popup">
    <div className="popup-content">
      <form onSubmit={addTask} className="popup-form">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleNewTaskChange}
          className="popup-input"
          required
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleNewTaskChange}
          className="popup-input"
          required
        />
        {/* Set column to "TODO" by default */}
        <input type="hidden" name="column" value="TODO" />
        <input
          type="datetime-local"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleNewTaskChange}
          className="popup-input"
          required
        />
        <button
          type="submit"
          className="popup-button popup-submit-button"
        >
          Add Task
        </button>
        <button
          type="button"
          className="popup-button"
          onClick={closeAddTaskPopup}
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
  )
}

export default AddTask
