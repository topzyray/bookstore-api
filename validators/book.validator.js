const Joi = require('joi');

const BookAddSchema = Joi.object({
  title: Joi.string().min(5).max(255).trim().required(),
  shortDescription: Joi.string().min(5).max(500).optional().trim(),
  longDescription: Joi.string().min(10).optional().trim(),
  year: Joi.number().integer().max(2024).required(),
  isbn: Joi.string().min(5).max(255).trim().required(),
  price: Joi.number().min(0).required(),
  createdAt: Joi.date().default(Date.now),
  lastUpdatedAt: Joi.date().default(Date.now),
});

const BookUpdateSchema = Joi.object({
  title: Joi.string().min(5).max(255).trim(),
  shortDescription: Joi.string().min(5).max(500).trim(),
  longDescription: Joi.string().min(10).trim(),
  year: Joi.number().integer().max(2024),
  isbn: Joi.string().min(5).max(255).trim(),
  price: Joi.number().min(0),
  lastUpdatedAt: Joi.date().default(Date.now),
});

const AddBookValidationMiddleware = async (req, res, next) => {
  const bookPayload = req.body;
  try {
    await BookAddSchema.validateAsync(bookPayload);
    next();
  } catch (err) {
    next({
      message: err.details[0].message,
      status: 400,
    });
  }
};

const UpdateBookValidationMiddleware = async (req, res, next) => {
  const bookPayload = req.body;
  try {
    await BookUpdateSchema.validateAsync(bookPayload);
    next();
  } catch (err) {
    next({
      message: err.details[0].message,
      status: 400,
    });
  }
};

module.exports = {
  AddBookValidationMiddleware,
  UpdateBookValidationMiddleware,
};
