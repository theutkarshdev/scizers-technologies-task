import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
  dueDate: { type: Date, required: true },
  status: { type: Boolean, default: false }, // Completed: true, Not Completed: false
});

export default mongoose.model("Task", taskSchema);
