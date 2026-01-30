import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";

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

//& Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
