import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import employeeRouter from "./routes/employeeRoutes.js";

console.log("Mongo URL:", process.env.MONGO_URI);

const app = express();
const port = process.env.PORT || 4000;

// Connect Database
connectDB();

// Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-auth-client-seven.vercel.app",
];

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Home Route
app.get("/", (req, res) => {
  res.send("API Working");
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/employee", employeeRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});