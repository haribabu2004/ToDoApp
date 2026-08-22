const express = require('express');
const router = express.Router();
const TaskSchema = require('../Models/Task');

// Toggle completed - only owner can update
router.put("/:id", async (req, res)=>{
    try {
        const {completed} = req.body;
        const userId = req.user.user.id;

        const task = await TaskSchema.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.userId.toString() !== userId) return res.status(403).json({ message: 'Forbidden' });

        task.completed = completed;
        await task.save();
        res.json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to update task' });
    }
})

// Edit task text - only owner can update
router.put("/edit/:id", async(req,res)=>{
    try {
        let {task} = req.body;
        const userId = req.user.user.id;

        const found = await TaskSchema.findById(req.params.id);
        if (!found) return res.status(404).json({ message: 'Task not found' });
        if (found.userId.toString() !== userId) return res.status(403).json({ message: 'Forbidden' });

        found.task = task;
        await found.save();
        res.json(found);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to edit task' });
    }
})

module.exports = router;