const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/userSchema");
const DailyProgress = require("../models/dailyProgressSchema");

router.get(
  "/dailyTasks",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = req.user;

      // Fetch the user with populated habit and task lists
      const getUser = await User.findById(user._id)
        .populate("habitList")
        .populate("taskList");

      if (!getUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Calculate total daily tasks and completed tasks
      const totalHabits = getUser.habitList.length;
      const totalTasks = getUser.taskList.length;
      const totalDailyTasks = totalHabits + totalTasks;

      if (totalDailyTasks === 0) {
        return res
          .status(200)
          .json({ message: "No tasks or habits found for today" });
      }

      // Filter completed habits and tasks
      const habitIsCompleted = getUser.habitList.filter(
        (habit) => habit.isCompleted
      );
      const totalHabitCompleted = habitIsCompleted.length;

      const taskIsCompleted = getUser.taskList.filter(
        (task) => task.isCompleted
      );
      const totalTaskCompleted = taskIsCompleted.length;

      // Calculate total daily tasks completed and progress
      const totalDailyTasksCompleted = totalHabitCompleted + totalTaskCompleted;
      let todayProgress = (totalDailyTasksCompleted / totalDailyTasks) * 100;
      todayProgress = parseFloat(todayProgress.toFixed(2));

      // Get today's date at midnight
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Check if there's already an entry for today's progress
      let dailyProgress = await DailyProgress.findOne({
        user: user._id,
        date: today,
      });

      if (dailyProgress) {
        dailyProgress.progressPercentage = todayProgress;
        await dailyProgress.save();
      } else {
        dailyProgress = new DailyProgress({
          date: today,
          progressPercentage: todayProgress,
          user: user._id,
        });
        await dailyProgress.save();
      }

      // Fetch all progress records for the user
      const allProgress = await DailyProgress.find({ user: user._id }).sort({
        date: -1,
      });

      return res.status(200).json({
        message: "All Progress Data:",
        allProgress, 
      });
    } catch (error) {
      console.error(error); 
      return res.status(500).json({
        message: "An error occurred while calculating daily progress",
        error: error.message,
      });
    }
  }
);

module.exports = router;
