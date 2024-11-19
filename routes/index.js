const express = require('express');
const router = express.Router();

// Sample data
let todoItems = [
  { id: 1, task: 'Buy groceries' },
];

let comments = [
  { id: 1, taskId: 1, text: "Remember to check expiration dates." },
];

// Display all todo items along with their comments
router.get('/', (req, res) => {
  res.render('index', { todoItems, comments });
});

// Display form to add a new todo item
router.get('/new', (req, res) => {
  res.render('new');
});

// Create a new todo item and optionally a comment
router.post('/new', (req, res) => {
  const { task, comment } = req.body;

  // Add the new task
  const newItem = { id: todoItems.length + 1, task };
  todoItems.push(newItem);

  // If a comment is provided, add it to the comments list
  if (comment && comment.trim() !== "") {
    const newComment = {
      id: comments.length + 1,
      taskId: newItem.id,
      text: comment,
    };
    comments.push(newComment);
  }

  res.redirect('/');
});

// Add a new comment for an existing task
router.post('/comment/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const { comment } = req.body;

  if (comment && comment.trim() !== "") {
    const newComment = {
      id: comments.length + 1,
      taskId,
      text: comment,
    };
    comments.push(newComment);
  }

  res.redirect('/');
});

// Display form to edit a todo item
router.get('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = todoItems.find(item => item.id === id);
  res.render('edit', { item });
});

// Update a todo item
router.post('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { task } = req.body;
  const itemIndex = todoItems.findIndex(item => item.id === id);
  todoItems[itemIndex] = { id, task };
  res.redirect('/');
});

// Delete a todo item
router.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todoItems = todoItems.filter(item => item.id !== id);
  comments = comments.filter(comment => comment.taskId !== id); // Remove associated comments
  res.redirect('/');
});

module.exports = router;
