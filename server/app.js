import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import connectDB from "./db/connect.js";

import interactionRouter from "./routes/interaction.js";

dotenv.config();
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(helmet());

// routes
// app.get("/api/test", (req, res) => {
//   res.json({ status: "OK", message: "Server is running" });
// });
app.use("/api/", interactionRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const res = await connectDB(process.env.MONGO_URI);
    console.log(res.modelNames());

    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
