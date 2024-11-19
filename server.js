// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("./styles"));

// // Set up EJS as the view engine
// app.set('view engine', 'ejs');

// // Set up routes
// const indexRoutes = require('./routes/index');
// app.use('/', indexRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const error = require("./utilities/error");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./styles"));

// Custom Middleware 1: Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Custom Middleware 2: Task Counter
// app.use((req, res, next) => {
//   console.log(`Current number of tasks: ${todoItems.length}`);
//   next();
// });

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);


// Error-Handling Middleware
app.use((err, req, res, next) => {
  console.error(`Error occurred: ${err.message}`);
  res.status(500).send('Something went wrong! Please try again later.');
});



// const taskRoutes = require("./routes/tasks");
// app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
