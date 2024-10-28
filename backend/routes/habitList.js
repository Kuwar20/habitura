const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const Habit = require("../models/habitSchema");
const passport = require("passport");
const mongoose = require("mongoose");
const Redis = require("ioredis");
const redis = new Redis();

// Create Habit
router.post(
  "/addHabit",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Get the authenticated user from req.user
      const user = req.user;
      // console.log(req.user)

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

      // Clear the cache after the operation
      await redis.del(`habits:${user._id}`);

      res
        .status(200)
        .json({ message: "Habit added", habitList: user.habitList, user });
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
      const user = req.user;

      const updatedHabit = await Habit.findByIdAndUpdate(
        id,
        { habit, startDate, endDate },
        { new: true } // This option ensures the updated document is returned
      );

      if (!updatedHabit) {
        return res.status(404).json({ message: "Habit not found" });
      }

      // Clear the cache after the operation
      await redis.del(`habits:${user._id}`);

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
      const user = req.user;
      const habitExists = await Habit.findByIdAndDelete(id);

      if (!habitExists) {
        return res.status(404).json({ message: "Habit Not Found" });
      }
      // Remove the habit reference from the user's habitList
      await User.findByIdAndUpdate(user._id, { $pull: { habitList: id } });

      // Clear the cache after the operation
      await redis.del(`habits:${user._id}`);

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

      // If cached habits are found, return them
      const cachedHabits = await redis.get(`habits:${userId}`);
      if (cachedHabits) {
        // console.log("Returning habits from Redis cache");
        return res.status(200).json(JSON.parse(cachedHabits));
      }

      const user = await User.findById(userId).populate("habitList");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await redis.set(
        `habits:${userId}`,
        JSON.stringify(user.habitList),
        "EX",
        3600
      );
      // console.log("Returning habits from database");

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
    const user = req.user;

    try {
      const updatedHabit = await Habit.findByIdAndUpdate(
        id,
        { $addToSet: { completionDates: new Date(date) } },
        { new: true }
      );

      if (!updatedHabit) {
        return res.status(404).json({ message: "Habit not found" });
      }

      // Clear the cache for the user's habits after the update
      await redis.del(`habits:${user._id}`);

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
    const user = req.user;

    try {
      const habit = await Habit.findByIdAndUpdate(
        id,
        { $pull: { completionDates: new Date(date) } },
        { new: true }
      );

      if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
      }

      // Clear the cache for the user's habits after the update
      await redis.del(`habits:${user._id}`);

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
    const user = req.user;

    try {
      const habit = await Habit.findByIdAndUpdate(
        id,
        { isCompleted },
        { new: true }
      );

      if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
      }

      // Clear the cache for the user's habits after the update
      await redis.del(`habits:${user._id}`);

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

      // Clear the cache for the user's habits after the update
      await redis.del(`habits:${user._id}`);

      res.status(200).json({
        message: "All habits unchecked successfully",
        habitList: updatedHabits,
      });
    } catch (error) {
      res.status(500).json({ message: "Error unchecking habits", error });
    }
  }
);

// GET request for retrieving habit details with calculations (using Aggregating Framework MongoDB)
router.get(
  "/getHabitDetails/:habitId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { habitId } = req.params;
    const user = req.user;

    try {
      const habitDetails = await Habit.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(habitId) },
        },
        {
          $addFields: {
            formattedStartDate: {
              $dateToString: { format: "%b %d, %Y", date: "$startDate" },
            },

            formattedEndDate: {
              $dateToString: { format: "%b %d, %Y", date: "$endDate" },
            },

            // Total days
            totalDays: {
              $add: [
                {
                  $dateDiff: {
                    startDate: "$startDate",
                    endDate: "$endDate",
                    unit: "day",
                  },
                },
                1,
              ],
            },

            completedDays: { $size: "$completionDates" },
            completedDaysStreak: "$completionDates",
          },
        },

        // Calculate Challenge Days
        {
          $addFields: {
            challengeStatus: {
              $cond: {
                if: { $ne: ["$endDate", null] },
                then: {
                  $cond: {
                    if: { $eq: ["$totalDays", 0] },
                    then: "Invalid date range",
                    else: {
                      $cond: {
                        if: { $eq: ["$completedDays", "$totalDays"] },
                        then: "🏆 Challenge completed",
                        else: {
                          $concat: [
                            "🎯 ",
                            { $toString: "$completedDays" },
                            " / ",
                            { $toString: "$totalDays" },
                            " Days Challenge",
                          ],
                        },
                      },
                    },
                  },
                },
                else: "No challenge",
              },
            },
          },
        },

        // Calculate maxStreak and currentStreak in streaks
        {
          $addFields: {
            streaks: {
              $let: {
                vars: {
                  latestCompletedDate: { $arrayElemAt: ["$completedDaysStreak", -1] },
                  // diff between last completed day and today
                  dayDiff: {
                    $dateDiff: {
                      startDate: { $arrayElemAt: ["$completedDaysStreak", -1] },
                      endDate: new Date(),
                      unit: "day"
                    }
                  }
                },
                in: {
                  $cond: {
                    if: { $lte: ["$$dayDiff", 1] }, // If the last completion was within 1 day
                    then: {
                      $reduce: {
                        input: { $sortArray: { input: "$completedDaysStreak", sortBy: 1 } },
                        initialValue: {
                          currentStreak: 0,
                          maxStreak: 0,
                          prevDate: null,
                        },
                        in: {
                          $let: {
                            vars: {
                              dayDifference: {
                                $cond: {
                                  if: { $ne: ["$$value.prevDate", null] },
                                  then: {
                                    $dateDiff: {
                                      startDate: "$$value.prevDate",
                                      endDate: "$$this",
                                      unit: "day",
                                    },
                                  },
                                  else: 0,
                                },
                              },
                            },
                            in: {
                              $cond: {
                                if: { $eq: ["$$value.prevDate", null] },
                                then: {
                                  currentStreak: 1,
                                  maxStreak: 1,
                                  prevDate: "$$this",
                                },
                                else: {
                                  $cond: {
                                    if: { $lte: ["$$dayDifference", 1] },
                                    then: {
                                      currentStreak: { $add: ["$$value.currentStreak", 1] },
                                      maxStreak: {
                                        $max: [
                                          "$$value.maxStreak",
                                          { $add: ["$$value.currentStreak", 1] },
                                        ],
                                      },
                                      prevDate: "$$this",
                                    },
                                    else: {
                                      currentStreak: 1,
                                      maxStreak: {
                                        $max: [
                                          "$$value.maxStreak",
                                          "$$value.currentStreak",
                                        ],
                                      },
                                      prevDate: "$$this",
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    else: { currentStreak: 0, maxStreak: { $max: "$streaks.maxStreak" } }, // Reset streak if the difference is > 1
                  },
                },
              },
            },
          },
        },

        // Calculate streakStatus
        {
          $addFields: {
            streakStatus: {
              $cond: {
                if: {
                  $and: [
                    { $gt: ["$streaks.currentStreak", 0] },
                    { $ne: ["$streaks.currentStreak", null] },
                  ],
                },
                then: {
                  $cond: {
                    if: { $eq: ["$streaks.currentStreak", 1] },
                    then: "🔥 1 Day Streak",
                    else: {
                      $concat: [
                        "🔥 ",
                        {
                          $toString: { $ifNull: ["$streaks.currentStreak", 0] },
                        },
                        " Days Streak",
                      ],
                    },
                  },
                },
                else: null,
              },
              //     },
              //   },
            },
          },
        },

        // Display
        {
          $project: {
            streaks: 1,
            streakStatus: 1,
            challengeStatus: 1,
            formattedStartDate: 1,
            formattedEndDate: 1,
            // completedDays: 1,
          },
        },
      ]);

      if (!habitDetails || habitDetails.length === 0) {
        return res.status(404).json({ message: "Habit not found" });
      }

      // Clear the cache for the user's habits after the update
      await redis.del(`habits:${user._id}`);

      return res.status(200).json(habitDetails[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching habit details" });
    }
  }
);

module.exports = router;
