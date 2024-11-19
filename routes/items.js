const express = require('express');
const router = express.Router();
//const items = require("../data/index");
const categories = require("../data/categories");
const items = require("../data/items");
const comments = require("../data/comments");
const error = require("../utilities/error");



// Display all tasks
router.get('/', (req, res) => {
  res.json(todoItems); // Sends tasks as JSON for testing
});

// Add a new task
router.post('/new', (req, res) => {
  const { task, categoryId } = req.body;
  const newItem = {
    id: todoItems.length + 1,
    task,
    categoryId: parseInt(categoryId),
  };
  todoItems.push(newItem);
  res.json({ message: "Task added", todoItems });
});

module.exports = router;
