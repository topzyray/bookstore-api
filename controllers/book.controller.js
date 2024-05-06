const BookModel = require('../models/books.model');

const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.json(books);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const getBookById = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await BookModel.findById(id);
    res.json(book);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message || 'Book not found');
  }
};

const addNewBook = async (req, res) => {
  const newBook = req.body;
  newBook.lastUpdateAt = new Date(); // set the lastUpdateAt to the current date
  try {
    const book = await BookModel.create(newBook);
    res.status(201).json(book);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const updateBookById = async (req, res) => {
  const id = req.params.id;
  const book = req.body;
  book.lastUpdateAt = new Date(); // set the lastUpdateAt to the current date
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(id, book, {
      new: true,
    });
    res.status(200).send(updatedBook);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const deleteBookById = async (req, res) => {
  const id = req.params.id;
  try {
    await BookModel.findOneAndDelete({ _id: id });
    res.status(200).send(`Book with ID: ${req.params.id} deleted successfully`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Book with the specified ID not found.');
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBookById,
  deleteBookById,
};
