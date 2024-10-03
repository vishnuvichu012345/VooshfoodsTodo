import axios from 'axios';

// Set the base URL for your API (e.g., localhost or your deployed server)
const API_URL = 'http://localhost:5000/api'; // Change to your actual backend URL

// Function to handle user signup
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });
    return response.data; // The token or any response you send from the backend
  } catch (error) {
    throw error.response.data; // Handle errors (like validation issues)
  }
};

// Function to handle user login (You can add this later)
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data; // The token or any response you send from the backend
  } catch (error) {
    throw error.response.data; // Handle errors (like invalid credentials)
  }
};
