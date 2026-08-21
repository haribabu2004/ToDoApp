const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TaskSchema = require("./Models/Task.js");
const protect = require ("./middleware/authHandler.js")
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("Mongo URI →", process.env.MONGO_URI);

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.use(express.json());

app.use("/update", protect, require("./Controller/TaskComplete"));
app.use("/auth", require("./Controller/Authentication"));

app.post("/add",protect, async (req, res) => {
  try {
    const { task } = req.body;
    const userId = req.user.user.id;

    const check = await TaskSchema.findOne({ task, userId });
    if (check) {
      res.status(409);
      console.log("task already exists");
      return res.json("task already exists");
    }

    const newTask = await TaskSchema.create({ task, userId });
    // await newTask.save();
    console.log("Task added successfully");
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json("Failed to add task");
  }
});

// Return tasks for the authenticated user only
app.get("/get", protect, async (req, res) => {
  try{
    const userId = req.user.user.id;
    const tasks = await TaskSchema.find({userId});
    res.json(tasks);
  }
  catch(err){
    console.log("Error fetching tasks:"+ err);
    res.status(500).json({message:"Failed to fetch tasks"});
  }  
});

// Delete a task only if it belongs to the authenticated user
app.delete("/delete/:id", protect, async (req, res) => {
  try {
    const userId = req.user.user.id;
    const task = await TaskSchema.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.userId.toString() !== userId) return res.status(403).json({ message: "Forbidden" });

    const result = await TaskSchema.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

port = process.env.port || 3002;
app.listen(port, () => {
  // console.log("Mongo URI:", process.env.MONGO_URI);
  console.log(`Running in ${port}`);
});
