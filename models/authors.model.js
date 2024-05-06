const mongoose = require('mongoose');

// Defining the author schema
const AuthorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  books: {
    type: Array,
    default: [],
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

// Creating the author model
const AuthorModel = new mongoose.model('authors', AuthorSchema);

// Exporting the author model for further usage
module.exports = AuthorModel;
