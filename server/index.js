import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import blogRoute from "./routes/blogRoute.js";
import commentRoute from "./routes/commentRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("api/blog", blogRoute);
app.use("/api/comments", commentRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
