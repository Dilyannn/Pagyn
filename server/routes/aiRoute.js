import express from "express
import { 
  generateOutline, 
  generateChapterContent 
} from "../controllers/aiController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

//^ AI Routes
router.post("/generate-outline", generateOutline);
router.post("/generate-chapter-content", generateChapterContent);

export default router;
