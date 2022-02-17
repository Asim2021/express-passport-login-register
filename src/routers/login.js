const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );
  if (!userWithEmail) {
    return res
      .status(400)
      .json({ message: "No Such user with this email is found!" });
  }
  if (!bcrypt.compare(password,userWithEmail.password)) {
    return res.status(400).json({ message: "Password does not match!" });
  }
  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    "m@shd%h&wqer9823jkbe23ybh"
  );
  res.json({ message:"Welcome Back!",token:jwtToken });
};

module.exports = loginUser;
