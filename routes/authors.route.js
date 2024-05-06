const express = require('express');
const {
  getAllAuthors,
  getAuthorById,
  addNewAuthor,
  updateAuhtorById,
  deleteAuthorById,
} = require('../controllers/author.controller');
const {
  AddAuthorValidationMiddleware,
  UpdateAuthorValidationMiddleware,
} = require('../validators/author.validator');

const authorRouter = express.Router();

authorRouter.get('/', getAllAuthors);

authorRouter.get('/:id', getAuthorById);

authorRouter.post('/', AddAuthorValidationMiddleware, addNewAuthor);

authorRouter.put('/:id', UpdateAuthorValidationMiddleware, updateAuhtorById);

authorRouter.delete('/:id', deleteAuthorById);

module.exports = authorRouter;
