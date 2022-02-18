const express = require("express");
const registerUser = require("./register");
const {loginUser,logoutUser} = require("./login");
const passport = require("passport");

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/logout",logoutUser)
userRouter.get("/payment",passport.authenticate("jwt", { session: false }),paymentUser);

async function paymentUser(req,res){
    res.send("You have a total of: 2400$");
  }

module.exports = userRouter;