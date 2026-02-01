import express from "express";
import { exportAsDocx, exportAsPdf } from "../controllers/exportController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/docx/:bookId", protect, exportAsDocx);
router.get("/pdf/:bookId", protect, exportAsPdf);

export default router;
