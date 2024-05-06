const AuthorSchema = require('../models/authors.model');

const getAllAuthors = async (req, res) => {
  try {
    const author = await AuthorSchema.find();
    res.json(author);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const getAuthorById = async (req, res) => {
  const id = req.params.id;
  try {
    const author = await AuthorSchema.findById(id);
    if (author === null) {
      res.status(404).send('Author with the specified ID not found.');
      return;
    }
    res.json(author);
  } catch (err) {
    console.log(err);
    res.status(404).send('Author with the specified ID not found');
  }
};

const addNewAuthor = async (req, res) => {
  const newAuthor = req.body;
  newAuthor.lastUpdateAt = new Date(); // set the lastUpdateAt to the current date
  try {
    const author = await AuthorSchema.create(newAuthor);
    res.status(201).json(author);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const updateAuhtorById = async (req, res) => {
  const id = req.params.id;
  const author = req.body;
  author.lastUpdateAt = new Date(); // set the lastUpdateAt to the current date
  try {
    const updatedAuthor = await AuthorSchema.findByIdAndUpdate(id, author, {
      new: true,
    });
    if (updatedAuthor === null) {
      res.status(404).send('Author with the specified ID not found.');
      return;
    }
    res.status(200).send(updatedAuthor);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const deleteAuthorById = async (req, res) => {
  const id = req.params.id;
  try {
    await AuthorSchema.findOneAndDelete({ _id: id });
    res
      .status(200)
      .send(`Author with ID: ${req.params.id} deleted successfully`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Author with the specified ID not found.');
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  addNewAuthor,
  updateAuhtorById,
  deleteAuthorById,
};
