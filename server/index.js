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

//~ Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[API Request] ${req.method} ${req.url}`);

  if (req.body && Object.keys(req.body).length > 0) {
    const sanitizedBody = { ...req.body };
    if (sanitizedBody.password) sanitizedBody.password = "*****"; // Hide password
    console.log("   Data:", JSON.stringify(sanitizedBody));
  }

  if (Object.keys(req.query).length > 0) {
    console.log("   Query:", JSON.stringify(req.query));
  }

  next();
});

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
