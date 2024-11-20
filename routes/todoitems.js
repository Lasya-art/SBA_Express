// const express = require("express");
// const router = express.Router();
// let tasks = require("../data/tasks");
// let comments = require("../data/comments");

// // Display all tasks with comments
// router.get("/", (req, res) => {
//   res.render("index", { tasks, comments });
// });

// // Display form to add a new task
// router.get("/new", (req, res) => {
//   res.render("new");
// });

// // Add a new task
// router.post("/new", (req, res) => {
//   const { task, comment } = req.body;
//   const newTask = { id: tasks.length + 1, task };
//   tasks.push(newTask);

//   if (comment && comment.trim() !== "") {
//     comments.push({
//       id: comments.length + 1,
//       taskId: newTask.id,
//       text: comment,
//     });
//   }

//   res.redirect("/");
// });

// // Add a comment to an existing task
// router.post("/add-comment/:id", (req, res) => {
//   const taskId = parseInt(req.params.id);
//   const { comment } = req.body;

//   if (comment && comment.trim() !== "") {
//     comments.push({
//       id: comments.length + 1,
//       taskId,
//       text: comment,
//     });
//   }

//   res.redirect("/");
// });

// module.exports = router;
