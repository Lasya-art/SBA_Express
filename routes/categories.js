const express = require("express");
const router = express.Router();

const categories = require("../data/categories");
const items = require("../data/items");
const comments = require("../data/comments");
const error = require("../utilities/error");

// Sample data for categories


// Display all categories
router.get('/', (req, res) => {
  res.json(categories); // Sends categories as JSON for testing
});

module.exports = router;
