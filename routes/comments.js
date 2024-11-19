const express = require('express'); 
const router = express.Router(); 

const categories = require("../data/categories");
const items = require("../data/items");
const comments = require("../data/comments");
const error = require("../utilities/error");




// Display comments for a specific task
router.get('/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const taskComments = comments.filter(comment => comment.taskId === taskId);
  res.json(taskComments);
});

// Add a new comment for a specific task
router.post('/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const { text } = req.body;
  const newComment = {
    id: comments.length + 1,
    taskId,
    text,
  };
  comments.push(newComment);
  res.json({ message: "Comment added", comments });
});

module.exports = router;
