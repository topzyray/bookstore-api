const Joi = require('joi');

const AuthorAddSchema = Joi.object({
  firstName: Joi.string().min(3).trim().required(),
  lastName: Joi.string().min(3).trim().required(),
  dob: Joi.date().greater('1-1-1900').less('1-1-2000').required(),
  country: Joi.string().trim().required(),
  books: Joi.array().items(Joi.string()),
  createdAt: Joi.date().default(Date.now),
  lastUpdatedAt: Joi.date().default(Date.now),
});

const AuthorUpdateSchema = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  dob: Joi.date(),
  country: Joi.string().trim(),
  books: Joi.array().items(Joi.string()),
});

const AddAuthorValidationMiddleware = async (req, res, next) => {
  const authorPayload = req.body;
  try {
    await AuthorAddSchema.validateAsync(authorPayload);
    next();
  } catch (err) {
    next({
      message: err.details[0].message,
      status: 400,
    });
  }
};

const UpdateAuthorValidationMiddleware = async (req, res, next) => {
  const authorPayload = req.body;
  try {
    await AuthorUpdateSchema.validateAsync(authorPayload);
    next();
  } catch (err) {
    next({
      message: err.details[0].message,
      status: 400,
    });
  }
};

module.exports = {
  AddAuthorValidationMiddleware,
  UpdateAuthorValidationMiddleware,
};
