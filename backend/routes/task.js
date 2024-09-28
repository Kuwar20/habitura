const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const passport = require("passport");
const Task = require("../models/taskSchema");

// Create Task
router.post(
  "/addTask",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Get the authenticated user from req.user
      const user = req.user;
      const { task } = req.body;

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized. Please log in." });
      }

      const addTask = new Task({
        task,
        user: user._id,
      });
      await addTask.save();

      user.taskList.push(addTask);
      await user.save();

      res.status(200).json({ message: "Task added", addTask });
    } catch (error) {
      console.error("Error adding Task:", error);
      res.status(400).json({ error: error.message });
    }
  }
);

// GET all tasks
router.get(
  "/getAllTasks",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.user;
    try {
      const getUser = await User.findById(user._id).populate("taskList");
      if (!getUser) {
        return res.status(404).json({ message: "User Not Found." });
      }

      return res.status(200).json(getUser.taskList);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Delete Task
router.delete(
  "/deleteTask/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.user._id
      const taskExists = await Task.findByIdAndDelete(id);

      if (!taskExists) {
        return res.status(404).json({ message: "Task Not Found" });
      }
      // Remove the task reference from the user's taskList
      await User.findByIdAndUpdate(userId, { $pull: { taskList: id } });

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting Task:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Update Task
router.put(
  "/updateTask/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { task } = req.body;
      const id = req.params.id;

      const updateTask = await Task.findByIdAndUpdate(
        id,
        { task},
        { new: true } // This option ensures the updated document is returned
      );

      if (!updateTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task Updated", updateTask });
    } catch (error) {
      console.error("Error updating Task:", error);
      res.status(400).json({ error: error.message });
    }
  }
);

// Task Completion Date
router.post("/completionTask/:id", async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;

  try {
    const updateTaskStatus = await Task.findByIdAndUpdate(
      id,
      { $addToSet: { completionDates: new Date(date) } },
      { new: true }
    );

    if (!updateTaskStatus) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task completed for today", updateTaskStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error completing task" });
  }
});

// Completion Date removal 
router.post("/removeCompletionDate/:id", async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { $pull: { completionDates: new Date(date) } },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Completion date deleted for a task", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error completing task" });
  }
});

// is Completed
router.post("/statusUpdate/:id", async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res
      .status(200)
      .json({ message: "Status updated successfully", task });
  } catch (error) {
    console.error("Error changing status of task", error);
    return res.status(500).json({ message: "Error changing status of task" });
  }
});


module.exports = router;
