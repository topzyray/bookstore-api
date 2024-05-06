const mongoose = require('mongoose');

// Defining the book schema
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: false,
  },
  longDescription: {
    type: String,
    required: false,
  },
  year: {
    type: Number,
    required: true,
    max: [2024, 'Year must be less than or equal to 2024'], // Validate with custom message
  },
  isbn: {
    type: String,
    required: true,
    unique: [true, 'ISBN must be unique'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be greater or equal to 0'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating the book model
const BookModel = new mongoose.model('books', BookSchema);

// Exporting the book model for further usage
module.exports = BookModel;
