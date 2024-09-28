const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        // Only require password if there are no social logins
        return this.socialLogins.length === 0;
      },
    },
    profilePicture: {
      type: String,
      default: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
    socialLogins: [
      {
        platform: {
          type: String,
          required: true,
        },
        id: {
          type: String,
          required: true,
          unique: true,
        },
      },
    ],
    habitList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Habit",
      },
    ],
    taskList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    dailyHabitRenewalTime: {
      type: String,
    },
    dailyProgressTrack: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DailyProgress",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
