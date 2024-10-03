import axios from 'axios';

// Set the base URL for your API (e.g., localhost or your deployed server)
const API_URL = 'https://vooshfoodstodo-1.onrender.com/api'; // Change to your actual backend URL

// Function to create an axios instance with authorization headers
const getAxiosInstance = () => {
  const token = localStorage.getItem('token'); // Replace 'token' with your actual token key

  return axios.create({
    baseURL: API_URL,
    headers: {
        'auth-token': token
    },
  });
};

// Function to get all tasks for a user
export const fetchTasks = async () => {
  const response = await getAxiosInstance().get('/');
  return response.data; // Return the fetched tasks
};

// Function to create a new task
export const createTask = async (taskData) => {
  const response = await getAxiosInstance().post('/', taskData);
  return response.data; // Return the created task
};

// Function to update an existing task
export const updateTask = async (id, taskData) => {
  const response = await getAxiosInstance().put(`/${id}`, taskData);
  return response.data; // Return the updated task
};

// Function to delete a task
export const deleteTask = async (id) => {
  await getAxiosInstance().delete(`/${id}`);
};
