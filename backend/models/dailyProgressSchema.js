const mongoose = require("mongoose");

const dailyProgressSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    progressPercentage:{
        type:Number
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DailyProgress", dailyProgressSchema)