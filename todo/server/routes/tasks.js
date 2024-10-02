const express = require('express');
const { Task } = require('../models');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get All Tasks for a User
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user } });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create Task
router.post('/', [auth, body('title').notEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, column, dueDate } = req.body;

  try {
    const newTask = await Task.create({ title, description, column, dueDate, userId: req.user });
    res.json(newTask);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update Task
router.put('/:id', [auth, body('title').notEmpty()], async (req, res) => {
  const { id } = req.params;
  const { title, description, column, dueDate } = req.body;

  try {
    let task = await Task.findOne({ where: { id, userId: req.user } });
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    task = await task.update({ title, description, column, dueDate });
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ where: { id, userId: req.user } });
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    await task.destroy();
    res.json({ msg: 'Task removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
