import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";

import aiRoutes from "./routes/aiRoute.js";
import authRoutes from "./routes/authRoute.js";
import bookRoutes from "./routes/bookRoute.js";
import exportRoutes from "./routes/exportRoute.js";

const app = express();

//~ Middleware for CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//* Connect DB
connectDB();

//~ JSON parser middleware
app.use(express.json());

//^ Folder for static files
app.use("/uploads", express.static(path.join(import.meta.dirname, "uploads")));

//& API Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/export", exportRoutes);

//! Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
