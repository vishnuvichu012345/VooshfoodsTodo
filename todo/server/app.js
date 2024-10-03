// app.js
const express = require('express');
const { connectDB } = require('./db');
const { User } = require('./models');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());

// Connect to MySQL
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
