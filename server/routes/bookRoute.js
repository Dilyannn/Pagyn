import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
  createBook,
  getBooks,
  getBooksById,
  updateBook,
  deleteBook,
  updateBookCoverArt
} from "../controllers/bookController.js";

const router = express.Router();

router.use(protect);

//^ Book Routes
router.route("/").post(upload, createBook).get(getBooks);
router.route("/:id").get(getBooksById).put(upload, updateBook).delete(deleteBook);
router.route("/:id/cover").put(upload, updateBookCoverArt);

export default router;
