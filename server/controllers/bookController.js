import Book from '../models/Book.js';

/**
 * @desc Create a new book
 * @route POST /api/books
 * @access Private
 */
const createBook = async (req, res) => {
  try {
    const { title, author, subtitle, chapters } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: 'Title and Author are required' });
    }

    const newBook = await Book.create({
      userId: req.user._id,
      title,
      author,
      subtitle,
      chapters,
    });

    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Server error', details: err.message });
  }
};

/**
 * @desc Get all books for a specific user
 * @route GET /api/books
 * @access Private
 */
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user._id }).sort({ createdAt: -1 }); // Latest books first
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error', details: err.message });
  }
};

/**
 * @desc Get a book by ID
 * @route GET /api/books/:id
 * @access Private
 */
const getBooksById = async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json({ message: 'Server error', details: err.message });
  }
};

/**
 * @desc Update a book
 * @route PUT /api/books/:id
 * @access Private
 */
const updateBook = async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json({ message: 'Server error', details: err.message });
  }
};

/**
 * @desc Delete a book
 * @route DELETE /api/books/:id
 * @access Private
 */
const deleteBook = async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json({ message: 'Server error', details: err.message });
  }
};

/**
 * @desc Update book cover art
 * @route PUT /api/books/:id/cover
 * @access Private
 */
const updateBookCoverArt = async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json({ message: 'Server error', details: err.message });
  }
};

export {
  createBook,
  getBooks,
  getBooksById,
  updateBook,
  deleteBook,
  updateBookCoverArt,
}