const express = require('express');
const router = express.Router();

let todoItems = require("../data/tasks");
let comments = require("../data/comments");

// Sample data
// let todoItems = [
//   { id: 1, task: 'Buy groceries' },
// ];

// let comments = [
//   { id: 1, taskId: 1, text: "Remember to check expiration dates." },
// ];

// Display all todo items along with their comments changed now 19
// router.get('/', (req, res) => {
//   res.render('index', { todoItems, comments });
// });

router.get('/', (req, res) => {

    const todosWithComments = todoItems.map(item => {
        const itemComments = comments.filter(comment => comment.taskId === item.id);
        return {
            ...item,
            comments: itemComments
        };
    });

    res.render('index', { todoItems: todosWithComments });
});

// Display form to add a new todo item
router.get('/new', (req, res) => {
    res.render('new');
});


router.post('/new', (req, res) => {
    const { task, comment } = req.body;


    const newItem = { id: todoItems.length + 1, task };
    todoItems.push(newItem);


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


router.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = todoItems.find(item => item.id === id);
    res.render('edit', { item });
});

router.put('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { task } = req.body;

    const itemIndex = todoItems.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        todoItems[itemIndex].task = task;
        res.status(200).json({ message: 'Todo item updated successfully!' });
    } else {
        res.status(404).json({ message: 'Todo item not found' });
    }
});

// Update a todo item
router.post('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { task } = req.body;
    const itemIndex = todoItems.findIndex(item => item.id === id);
    todoItems[itemIndex] = { id, task };
    res.redirect('/');
});



// router.post('/delete/:id', (req, res) => {
//     const id = parseInt(req.params.id);


//     todoItems = todoItems.filter(item => item.id !== id);


//     comments = comments.filter(comment => comment.taskId !== id);


//     todoItems.forEach((item, index) => {
//         item.id = index + 1;
//     });

//     res.redirect('/');
// });

// Delete a todo item
router.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id); // Extract task ID from URL parameter
  
    // Remove the task with the given ID
    todoItems = todoItems.filter(item => item.id !== id);
  
    // Remove all comments associated with the deleted task
    comments = comments.filter(comment => comment.taskId !== id);
  
    // Reassign IDs for remaining tasks to ensure task numbers are sequential
    todoItems.forEach((item, index) => {
      item.id = index + 1;
    });
  
    res.redirect('/'); // Redirect back to the main page after deletion
  });
  

module.exports = router;
