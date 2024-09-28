const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
require("dotenv").config();

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const findUser = await User.findOne({ email });
    if (findUser) {
      return res
        .status(403)
        .json({ error: "A user with this email already exists" });
    }
    // Hash password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const addUser = { fullname, email, password: hashPassword };
    const newUser = await User.create(addUser);

    // Create token
    const genToken = jwt.sign(
      { email: email, id: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10d" }
    );
    res.status(201).json({
      success: "User registered successfully",
      newUser,
      token: genToken,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const findUser = await User.findOne({ email });
  if (!findUser) {
    return res.status(404).json({ error: "Invalid Credentials" });
  }
  const isPasswordValid = await bcrypt.compare(password, findUser.password);
  if (!isPasswordValid) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  // create token
  const genToken = jwt.sign(
    { email: email, id: findUser._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "10d" }
  );

  return res.status(200).json({
    success: "User Logged In successfully",
    token: genToken,
    id: findUser._id,
  });
});

// social media logins
router.post("/socialLogin", async (req, res) => {
  const { name, email, platform, id, profilePicture } = req.body;

  try {
    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    if (user) {
      // See if the given platform is already present with the email
      const existingLogin = user.socialLogins.find(
        (item) => item.platform === platform && item.id === id
      );

      if (existingLogin) {
        // If the platform and ID match, log the user in
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "10d",
        });

        return res.status(200).json({ success: true, user, token });
      } else {
        // If platform and ID do not match, add the new social login to the user's account
        user.socialLogins.push({ platform, id });
        user.fullname = name;
        user.profilePicture = profilePicture;

        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "10d",
        });

        return res.status(200).json({ success: true, user, token });
      }
    }

    // If no user exists, create a new one
    const newUser = new User({
      email,
      fullname: name,
      profilePicture: profilePicture,
      socialLogins: [{ platform, id }],
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10d",
    });

    res.status(200).json({ success: true, newUser, token });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ success: false, error: "Error saving user" });
  }
});


module.exports = router;
