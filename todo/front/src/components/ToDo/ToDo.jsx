import React, { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../services/taskService"; // Import your task service
import "./ToDo.css";
import TaskPopup from "./TaskPopup";
import TaskView from "./TaskView";
import LogoutDialog from "./LogoutDialog";
import AddTask from "./AddTask";

// Initialize state for the TaskBoard component
const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [draggedTask, setDraggedTask] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskToView, setTaskToView] = useState(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    column: "TODO", // Ensure you're using 'column' instead of 'status'
    dueDate: "",
  });
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [notification, setNotification] = useState(""); // State for notifications
  const [isNotificationVisible, setIsNotificationVisible] = useState(false); // State to manage visibility

  // Fetch tasks on component mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    loadTasks();
  }, []);

  // Show notification
  const showNotification = (message) => {
    setNotification(message);
    setIsNotificationVisible(true);
    setTimeout(() => {
      setIsNotificationVisible(false);
    }, 3000); // Hide after 3 seconds
  };

  // Filter tasks based on the search input
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  // Sort tasks based on selected criteria
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return a.title.localeCompare(b.title);
  });

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.setData("text/plain", task.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, newColumn) => {
    e.preventDefault();
    if (draggedTask) {
      const updatedTask = {
        ...draggedTask,
        column: newColumn, // Update column instead of status
      };

      try {
        const response = await updateTask(draggedTask.id, updatedTask);
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === response.id ? response : task))
        );
        setDraggedTask(null);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const openAddTaskPopup = () => {
    setIsAddingTask(true);
  };

  const closeAddTaskPopup = () => {
    setIsAddingTask(false);
    setNewTask({ title: "", description: "", column: "TODO", dueDate: "" }); // Ensure 'column' is used
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const task = await createTask({
        ...newTask,
        createdAt: new Date().toLocaleString(),
      });
      setTasks((prevTasks) => [...prevTasks, task]);
      showNotification("Task added successfully!"); // Show notification
      closeAddTaskPopup();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsEditPopupOpen(true);
  };

  const handleSaveEditedTask = async (updatedTask) => {
    try {
      const task = await updateTask(updatedTask.id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
      showNotification("Task updated successfully!"); // Show notification
      setIsEditPopupOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTaskHandler = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      showNotification("Task deleted successfully!"); // Show notification
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleViewTask = (task) => {
    setTaskToView(task); // Set the selected task to view
  };

  const closeViewTask = () => {
    setTaskToView(null); // Reset the view task state
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    window.location.href = "/"; // Redirect to the login page
  };

  return (
    <>
      <header className="header">
        <div className="logo">Logo</div>
        <div className="header-buttons">
          <button
            className="header-button logout-button"
            onClick={() => setIsLogoutDialogOpen(true)} // Open the logout dialog
          >
            Logout
          </button>
        </div>
      </header>

      <div className="containerTodo">
        {isNotificationVisible && (
          <div className="notification">{notification}</div> // Show notification if visible
        )}
        <button className="add-button" onClick={openAddTaskPopup}>
          Add Task
        </button>
        <div className="task-header">
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="sort-container">
            <span className="sort-label">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="recent">Recent</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>

        <div className="board">
          {["TODO", "IN PROGRESS", "DONE"].map((column) => (
            <div
              key={column}
              className="column"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column)} // Pass the new column
            >
              <div className="column-header">{column}</div>
              {sortedTasks
                .filter((task) => task.column === column) // Filter by 'column'
                .map((task) => (
                  <div
                    key={task.id}
                    className="task"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <div className="task-title">{task.title}</div>
                    <div className="task-description">{task.description}</div>
                    <div className="task-date">
                      Due Date: {new Date(task.dueDate).toLocaleString()}{" "}
                    </div>
                    <div className="task-actions">
                      <button
                        className="action-button delete-button"
                        onClick={() => deleteTaskHandler(task.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="action-button edit-button"
                        onClick={() => handleEditTask(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-button view-button"
                        onClick={() => handleViewTask(task)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {isAddingTask && (
          <AddTask addTask ={addTask} newTask={newTask} handleNewTaskChange={handleNewTaskChange} closeAddTaskPopup={closeAddTaskPopup}/>
        )}

        {isEditPopupOpen && (
          <TaskPopup
            task={taskToEdit}
            onSave={handleSaveEditedTask}
            onClose={() => setIsEditPopupOpen(false)}
          />
        )}

        {taskToView && (
          <TaskView task={taskToView} onClose={closeViewTask} />
        )}

        {isLogoutDialogOpen && (
          <LogoutDialog
            isOpen={isLogoutDialogOpen}
            onClose={() => setIsLogoutDialogOpen(false)}
            onConfirm={handleLogout}
          />
        )}
      </div>
    </>
  );
};

export default TaskBoard;
