const express = require("express");
const router = express.Router();
const passport = require("passport");
const Note = require("../models/addNoteSchema");
const Redis = require("ioredis");
const redis = new Redis();

// use debounce/ throttle

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
      const userId = req.user._id;
      const updatedNote = await Note.findOneAndUpdate(
        { user: user._id },
        { note },
        { new: true, upsert: true }
      );

      // Cache the updated note in Redis
      // await redis.set(
      //   `note:${userId}`,
      //   JSON.stringify(updatedNote),
      //   "EX",
      //   3600
      // );

      res.status(200).json({ message: "Note saved", updatedNote });
    } catch (error) {
      console.error("Error adding/updating note:", error);
      res.status(400).json({ error: error.message });
    }
  }
);

router.get(
  "/getNote",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    try {
      // Check Redis cache first
      // const cachedNote = await redis.get(`note:${user._id}`);
      // if (cachedNote) {
      //   return res
      //     .status(200)
      //     .json({ message: "My Notes", note: JSON.parse(cachedNote) });
      // }

      const note = await Note.find({ user: user._id });
      if (!note) {
        return res.status(404).json({ message: "Note not found." });
      }

      // Cache the retrieved notes
      // await redis.set(
      //   `note:${user._id}`,
      //   JSON.stringify(notes),
      //   "EX",
      //   3600
      // );

      res.status(200).json({ message: "My Notes", note });
    } catch (error) {
      console.error("Error getting note:", error);
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
