const mongoose = require("mongoose");

const addNoteSchema = new mongoose.Schema(
  {
    note:{
        type: String,
        required:false
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", addNoteSchema)
