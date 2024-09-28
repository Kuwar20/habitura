const express = require("express");
const router = express.Router();
const Habit = require("../models/habitSchema");
const User = require("../models/userSchema");
const passport = require("passport");

// Cron Job to Reset Habits Daily Based on User's Selected Renewal Time
// cron.schedule("* * * * *", async () => {
//   try {
//     const currentTime = new Date().toTimeString().slice(0, 5);

//     const users = await User.find({});

//     for (const user of users) {
//       const renewalTime = user.dailyHabitRenewalTime;

//       if (currentTime === renewalTime) {
//         const result = await Habit.updateMany({ user: user._id }, { isCompleted: false });
//         // console.log(`Update Result: ${result.modifiedCount} documents updated`); 
//       }
//     }
//   } catch (error) {
//     console.error("Error resetting habits:", error);
//   }
// });

// Patch renewal time
router.patch(
  "/habitRenewalTime",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user._id;
    const { renewalTime } = req.body;

    if (!renewalTime) {
      return res.status(400).json({ message: "Renewal time is required." });
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { dailyHabitRenewalTime: renewalTime },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      return res.status(200).json({
        message: "Habit renewal time updated successfully.",
        renewalTime: updatedUser.dailyHabitRenewalTime,
        user: req.user,
      });
    } catch (error) {
      console.error("Error updating renewal time:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while updating the time." });
    }
  }
);

// Get User
router.get('/me', passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.user;
    if (user) {
      return res.status(200).json({ message: "User Latest details", user });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  }
);


module.exports = router;
