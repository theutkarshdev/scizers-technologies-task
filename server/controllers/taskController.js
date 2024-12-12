import Task from "../models/taskModel.js";

// Fetch all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err });
  }
};

// Add a new task
export const addTask = async (req, res) => {
  const { title, priority, dueDate, status } = req.body;
  console.log(req.body);

  // Validate input
  if (!title || !priority || !dueDate) {
    return res.status(400).json({
      message: "Missing required fields",
      requiredFields: ["title", "priority", "dueDate"],
    });
  }

  try {
    const newTask = new Task({ title, priority, dueDate, status });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Error adding task", error: err });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, priority, dueDate, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { title, priority, dueDate, status }, { new: true });

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err });
  }
};
