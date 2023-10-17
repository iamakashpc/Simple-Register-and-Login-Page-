import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import { notFound, errorHandler } from "./middlewares/ErrorHandler.js";
const app = express();

dotenv.config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected");
  } catch (error) {
    console.log(error.message);
  }
};
connectDB();
app.use(cors());

app.use(express.json());

app.get("/api/", (req, res) => {
  res.status(201).json({ success: true, message: "Hello " });
});

app.use("/api/users", AuthRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on ${PORT} PORT`));
