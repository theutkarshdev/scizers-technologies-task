import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json({ limit: "10mb" }));
app.use(cors());

connectToMongoDB()
  .then(() => {
    app.use("/api/tasks", taskRoutes);
    app.all("*", (req, res) => {
      res.status(500).json({ message: "invalid request" });
    });
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
