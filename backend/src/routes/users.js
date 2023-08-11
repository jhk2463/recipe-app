const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/Users");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  //Check if user already exists
  const user = await UserModel.findOne({ username: username });
  if (user) {
    return res.json({ message: "User already exists!" });
  }

  //Create user in database
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username: username,
    password: hashedPassword,
  });
  await newUser.save();
  //   **Equivalent**
  //   UserModel.create({
  //     username: username,
  //     password: hashedPassword,
  //   });

  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //Check if user does not exist
  const user = await UserModel.findOne({ username: username });
  if (!user) {
    return res.json({ message: "User does not exist!" });
  }

  //Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is incorrect" });
  }

  //Create user token for authentication
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
  res.json({ token, userID: user._id });
});

module.exports = router;
