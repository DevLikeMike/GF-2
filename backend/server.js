import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
// Route imports
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
// Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);

app.use(notFound);
app.use(errorHandler);

// Port declaration
const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`.yellow.bold);
});
