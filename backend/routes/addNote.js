const express = require("express");
const router = express.Router();
const passport = require("passport");
const Note = require("../models/addNoteSchema");

router.post(
  "/note",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.user;
    const { note } = req.body;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    try {
      let existingNote = await Note.findOne({ user: user._id });

      if (existingNote) {
        existingNote.note = note;
        await existingNote.save();
      } else {
        existingNote = new Note({ note, user: user._id });
        await existingNote.save();
      }

      res.status(200).json({ message: "Note saved", note });
    } catch (error) {
      console.error("Error adding/updating note:", error);
      res.status(400).json({ error: error.message });
    }
  }
);


router.get('/getNote', passport.authenticate("jwt", { session: false }), 
async (req, res) => {
  const user = req.user;  // Extract the authenticated user from the request
  if (!user) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const note = await Note.find({ user: user._id });

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json({ message: "My Notes", note });
  } catch (error) {
    console.error("Error getting note:", error);
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
