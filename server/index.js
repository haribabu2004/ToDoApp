const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TaskSchema = require("./Models/Task");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/TodoList")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.post("/add", async (req, res) => {
  try {
    const task = req.body.task;

    const check = await TaskSchema.findOne({ task });
    if (check) {
      res.status(409);
      res.json("task already exists");
    }

    const newTask = await TaskSchema.create({task});

    res.status(201).json(newTask);

  } catch (err) {
    console.log(err);
  }
});

app.get("/get", (req, res) => {
  TaskSchema.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/delete/:id",(req,res)=>{
  TaskSchema.deleteOne({_id:req.params.id})
  .then(result=>{
    res.json(result);
  })
  .catch(err=>{
    console.log(err);
  })
})

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
