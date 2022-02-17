const express = require("express");
const registerUser = require("./register");
const loginUser = require("./login");
const paymentApi = require("./payment");

const userRouter = express.Router();
const userRegister = express.Router();

userRegister.post("/register",registerUser);
userRouter.post("/login",loginUser);
// userRouter.use(paymentApi);

module.exports = {userRouter,userRegister};