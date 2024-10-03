import axios from 'axios';

// Set the base URL for your API (e.g., localhost or your deployed server)
const API_URL = 'https://vooshfoodstodo-1.onrender.com'; // Change to your actual backend URL

// Function to handle user signup
// Function to handle user signup
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });
    return response.data; // Return backend response
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data; // Pass specific error from backend
    } else {
      throw { msg: 'Server error, please try again later' }; // Default fallback error
    }
  }
};


// Function to handle user login (You can add this later)
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; // The token or any response you send from the backend
  } catch (error) {
    throw error.response.data; // Handle errors (like invalid credentials)
  }
};
