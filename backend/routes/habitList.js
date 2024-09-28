const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const Habit = require("../models/habitSchema");
const passport = require("passport");

// Create Habit
router.post(
  "/addHabit",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Get the authenticated user from req.user
      const user = req.user;
      const { habit, startDate, endDate } = req.body;

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized. Please log in." });
      }

      const addHabit = new Habit({
        habit,
        user: user._id,
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate,
      });
      await addHabit.save();

      user.habitList.push(addHabit);
      await user.save();

      res
        .status(200)
        .json({ message: "Habit added", habitList: user.habitList });
    } catch (error) {
      console.error("Error adding habit:", error);
      res.status(400).json({ error: error.message });
    }
  }
);

// Update Habit
router.put(
  "/updateHabit/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { habit, startDate, endDate } = req.body;
      const id = req.params.id;

      const updatedHabit = await Habit.findByIdAndUpdate(
        id,
        { habit, startDate, endDate },
        { new: true } // This option ensures the updated document is returned
      );

      if (!updatedHabit) {
        return res.status(404).json({ message: "Habit not found" });
      }

      res.status(200).json({ message: "Habit Updated", updatedHabit });
    } catch (error) {
      console.error("Error updating Habit:", error);
      res.status(400).json({ error: error.message });
    }
  }
);

// Delete Habit
router.delete(
  "/deleteHabit/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.user._id;
      const habitExists = await Habit.findByIdAndDelete(id);

      if (!habitExists) {
        return res.status(404).json({ message: "Habit Not Found" });
      }
      // Remove the habit reference from the user's habitList
      await User.findByIdAndUpdate(userId, { $pull: { habitList: id } });

      res.status(200).json({ message: "Habit deleted successfully" });
    } catch (error) {
      console.error("Error deleting habit:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Get Habit Info
router.get(
  "/getHabit/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const id = req.params.id;
      const habit = await Habit.findById(id);

      if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
      }

      res.status(200).json(habit);
    } catch (error) {
      console.error("Error fetching habit:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Get all habits of a user
router.get(
  "/getHabitslist",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user._id;

      const user = await User.findById(userId).populate("habitList");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user.habitList);
    } catch (error) {
      console.error("Error fetching habits:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Completion Habit
router.post(
  "/completionHabit/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { date } = req.body;

    try {
      const updatedHabit = await Habit.findByIdAndUpdate(
        id,
        { $addToSet: { completionDates: new Date(date) } },
        { new: true }
      );

      if (!updatedHabit) {
        return res.status(404).json({ message: "Habit not found" });
      }

      res
        .status(200)
        .json({ message: "Habit completed for today", habit: updatedHabit });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error completing habit" });
    }
  }
);

// Remove Completion Habit
router.post(
  "/removeCompletionDate/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { date } = req.body;

    try {
      const habit = await Habit.findByIdAndUpdate(
        id,
        { $pull: { completionDates: new Date(date) } },
        { new: true }
      );

      if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
      }

      res
        .status(200)
        .json({ message: "Completion date deleted for a habit", habit });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error completing habit" });
    }
  }
);

// is Completed
router.post(
  "/statusUpdate/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { isCompleted } = req.body;

    try {
      const habit = await Habit.findByIdAndUpdate(
        id,
        { isCompleted },
        { new: true }
      );

      if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
      }
      return res
        .status(200)
        .json({ message: "Status updated successfully", habit });
    } catch (error) {
      console.error("Error changing status of habit", error);
      return res
        .status(500)
        .json({ message: "Error changing status of habit" });
    }
  }
);

// Uncheck all habits
router.post(
  "/uncheckAll",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      await Habit.updateMany(
        { user: user._id },
        { $set: { isCompleted: false } }
      );
      const updatedHabits = await Habit.find({ user: user._id });

      res.status(200).json({
        message: "All habits unchecked successfully",
        habitList: updatedHabits,
      });
    } catch (error) {
      res.status(500).json({ message: "Error unchecking habits", error });
    }
  }
);

module.exports = router;
