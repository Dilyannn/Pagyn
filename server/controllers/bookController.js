import Book from "../models/Book.js";

/**
 * @desc Create a new book
 * @route POST /api/books
 * @access Private
 */
const createBook = async (req, res) => {
  try {
    const { title, author, subtitle, chapters } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Title and Author are required" });
    }

    const bookData = {
      userId: req.user._id,
      title,
      author,
      subtitle,
      chapters,
    };

    if (req.file) {
      bookData.coverArt = req.file.filename;
    }

    const newBook = await Book.create(bookData);

    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: "Server error", details: err.message });
  }
};

/**
 * @desc Get all books for a specific user
 * @route GET /api/books
 * @access Private
 */
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user._id }).sort({
      createdAt: -1,
    }); // Latest books first
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Server error", details: err.message });
  }
};

/**
 * @desc Get a book by ID
 * @route GET /api/books/:id
 * @access Private
 */
const getBooksById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error", details: err.message });
  }
};

/**
 * @desc Update a book
 * @route PUT /api/books/:id
 * @access Private
 */
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Create an update object from req.body
    const updateData = { ...req.body };

    // If a file was uploaded, add it to the update object
    if (req.file) {
      updateData.coverArt = req.file.filename;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: "Server error", details: err.message });
  }
};

/**
 * @desc Delete a book
 * @route DELETE /api/books/:id
 * @access Private
 */
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await book.deleteOne();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", details: err.message });
  }
};

/**
 * @desc Update book cover art
 * @route PUT /api/books/:id/cover
 * @access Private
 */
const updateBookCoverArt = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    if (req.file) {
      book.coverArt = req.file.filename;
    } else {
      return res.status(400).json({ message: "No cover art file uploaded" });
    }

    const updatedBook = await book.save();

    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: "Server error", details: err.message });
  }
};

export {
  createBook,
  getBooks,
  getBooksById,
  updateBook,
  deleteBook,
  updateBookCoverArt,
};
