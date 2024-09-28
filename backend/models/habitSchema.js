const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    habit: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    isCompleted:{
      type:Boolean,
      default:false,
    },
    completionDates: [
      {
        type: Date,
        required: false,
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);
