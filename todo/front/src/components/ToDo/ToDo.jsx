import React, { useState } from 'react';
import TaskPopup from '../PopUp/PopUp';

const initialTasks = [
  { id: 1, title: 'Task 1', description: 'Description 1', status: 'TODO', createdAt: '01/09/2021, 05:30:00' },
  { id: 2, title: 'Task 2', description: 'Description 2', status: 'TODO', createdAt: '01/09/2021, 05:30:00' },
  { id: 3, title: 'Task 3', description: 'Description 3', status: 'TODO', createdAt: '01/09/2024, 05:30:00' },
  { id: 4, title: 'Task 4', description: 'Description 4', status: 'IN PROGRESS', createdAt: '01/09/2024, 05:30:00' },
  { id: 5, title: 'Task 5', description: 'Description 5', status: 'IN PROGRESS', createdAt: '01/09/2021, 05:30:00' },
  { id: 6, title: 'Task 6', description: 'Description 6', status: 'DONE', createdAt: '01/09/2021, 05:30:00' },
];

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [draggedTask, setDraggedTask] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'TODO' });

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // Track Edit Popup visibility
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);  // State to control View Details popup
  const [taskToView, setTaskToView] = useState(null); 

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return a.title.localeCompare(b.title);
  });

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.setData('text/plain', task.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (draggedTask) {
      const updatedTasks = tasks.map(task =>
        task.id === draggedTask.id ? { ...task, status } : task
      );
      setTasks(updatedTasks);
      setDraggedTask(null);
    }
  };

  const openAddTaskPopup = () => {
    setIsAddingTask(true);
  };

  const closeAddTaskPopup = () => {
    setIsAddingTask(false);
    setNewTask({ title: '', description: '', status: 'TODO' });
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const addTask = (e) => {
    e.preventDefault();
    const task = {
      id: tasks.length + 1,
      ...newTask,
      createdAt: new Date().toLocaleString(),
    };
    setTasks([...tasks, task]);
    closeAddTaskPopup();
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id) => {
    console.log('Edit task', id);
  };

  const viewDetails = (id) => {
    console.log('View details', id);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task); // Set the task to be edited
    setIsEditPopupOpen(true); // Open the Edit Popup
  };

  const handleViewTask = (task) => {
    setTaskToView(task);  // Set the task to view
    setIsViewPopupOpen(true);  // Open the View Details popup
  };


  const handleSaveEditedTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setIsEditPopupOpen(false); // Close the popup after saving
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      backgroundColor: '#3b82f6',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    headerButtons: {
      display: 'flex',
    },
    headerButton: {
      marginLeft: '10px',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    logoutButton: {
      backgroundColor: 'red',
      color: 'white',
    },
    addButton: {
      backgroundColor: '#4285F4',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      marginBottom: '20px',
    },
    taskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: '#f5f5f5',
      borderRadius: '4px',
      marginBottom: '20px',
    },
    searchInput: {
      padding: '8px',
      width: '300px',
      fontSize: '14px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    sortContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    sortLabel: {
      marginRight: '10px',
    },
    sortSelect: {
      padding: '8px',
      fontSize: '14px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    board: {
      display: 'flex',
      gap: '20px',
    },
    column: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      padding: '10px',
    },
    columnHeader: {
      backgroundColor: '#4285F4',
      color: 'white',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '10px',
    },
    task: {
      backgroundColor: '#e6f2ff',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '4px',
    },
    taskTitle: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    taskDescription: {
      fontSize: '14px',
      marginBottom: '5px',
    },
    taskDate: {
      fontSize: '12px',
      color: '#666',
      marginBottom: '5px',
    },
    taskActions: {
      display: 'flex',
      gap: '5px',
    },
    actionButton: {
      padding: '5px 10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    deleteButton: {
      backgroundColor: '#ff4444',
      color: 'white',
    },
    editButton: {
      backgroundColor: '#4285F4',
      color: 'white',
    },
    viewButton: {
      backgroundColor: '#42a5f5',
      color: 'white',
    },
    popup: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    popupContent: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '4px',
      width: '300px',
    },
    popupForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    popupInput: {
      padding: '5px',
      fontSize: '14px',
    },
    popupSelect: {
      padding: '5px',
      fontSize: '14px',
    },
    popupButton: {
      padding: '5px 10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    popupSubmitButton: {
      backgroundColor: '#4285F4',
      color: 'white',
    },
    popupCancelButton: {
      backgroundColor: '#ccc',
      color: 'black',
    },
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.logo}>Logo</div>
        <div style={styles.headerButtons}>
          <button style={{...styles.headerButton, ...styles.logoutButton}}>Logout</button>
        </div>
      </header>

      <div style={styles.container}>
        <button style={styles.addButton} onClick={openAddTaskPopup}>
          Add Task
        </button>
        <div style={styles.taskHeader}>
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              style={styles.searchInput}
            />
          </div>
          <div style={styles.sortContainer}>
            <span style={styles.sortLabel}>Sort By:</span>
            <select
              value={sortBy}
              onChange={handleSort}
              style={styles.sortSelect}
            >
              <option value="recent">Recent</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>

        <div style={styles.board}>
          {['TODO', 'IN PROGRESS', 'DONE'].map(status => (
            <div
              key={status}
              style={styles.column}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              <div style={styles.columnHeader}>{status}</div>
              {sortedTasks.filter(task => task.status === status).map(task => (
                <div
                  key={task.id}
                  style={styles.task}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <div style={styles.taskTitle}>{task.title}</div>
                  <div style={styles.taskDescription}>{task.description}</div>
                  <div style={styles.taskDate}>Created at: {task.createdAt}</div>
                  <div style={styles.taskActions}>
                    <button
                      style={{...styles.actionButton, ...styles.deleteButton}}
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                    <button
                      style={{...styles.actionButton, ...styles.editButton}}
                      onClick={() => handleEditTask(task)}
                    >
                      Edit
                    </button>
                    <button
                      style={{...styles.actionButton, ...styles.viewButton}}
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
          <div style={styles.popup}>
            <div style={styles.popupContent}>
              <form onSubmit={addTask} style={styles.popupForm}>
                <input
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  value={newTask.title}
                  onChange={handleNewTaskChange}
                  style={styles.popupInput}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Task Description"
                  value={newTask.description}
                  onChange={handleNewTaskChange}
                  style={styles.popupInput}
                  required
                />
                <select
                  name="status"
                  value={newTask.status}
                  onChange={handleNewTaskChange}
                  style={styles.popupSelect}
                >
                  <option value="TODO">TODO</option>
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
                <button type="submit" style={{...styles.popupButton, ...styles.popupSubmitButton}}>
                  Add Task
                </button>
                <button type="button" onClick={closeAddTaskPopup} style={{...styles.popupButton, ...styles.popupCancelButton}}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {isEditPopupOpen && (
        <TaskPopup
          isOpen={isEditPopupOpen}
          onClose={() => setIsEditPopupOpen(false)}
          initialTask={taskToEdit}
          onSave={handleSaveEditedTask}
        />
      )}
      {isViewPopupOpen && (
        <TaskPopup
          task={taskToView}  // Pass the selected task to the popup
          onClose={() => setIsViewPopupOpen(false)}  // Close the popup
        />
      )}
    </>
  );
};

export default TaskBoard;