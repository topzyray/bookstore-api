const express = require('express');
const {
  AddBookValidationMiddleware,
  UpdateBookValidationMiddleware,
} = require('../validators/book.validator');
const {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBookById,
  deleteBookById,
} = require('../controllers/book.controller');

const bookRouter = express.Router();

bookRouter.get('/', getAllBooks);

bookRouter.get('/:id', getBookById);

bookRouter.post('/', AddBookValidationMiddleware, addNewBook);

bookRouter.put('/:id', UpdateBookValidationMiddleware, updateBookById);

bookRouter.delete('/:id', deleteBookById);

module.exports = bookRouter;
