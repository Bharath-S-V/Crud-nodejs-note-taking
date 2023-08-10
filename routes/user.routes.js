const express = require("express");
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();


userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) return res.send({ message: "something went wrong", status: 0 });
    try {
      let user = new UserModel({ name, email, password: hash });
      await user.save();
      res.send({
        message: "user created",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: err.message,
        status: 0,
      });
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let option={
    expiresIn:"30m"
  }

  try {
    let data = await UserModel.find({ email });
    if (data.length > 0) {
      let token = jwt.sign({ userid: data[0]._id }, "bharath",option);
      bcrypt.compare(password, data[0].password, function (err, result) {
        if (err)
          return res.send({
            message: "something went wrong:" + err,
            status: 0,
          });
        if (result) {
          res.send({
            message: "user logged successfully",
            token: token,
            status: 1,
          });
        } else {
          res.send({
            message: "incorrect password",
            status: 0,
          });
        }
      });
    } else
      res.send({
        message: "user doesn't exist",
        status: 0,
      });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

module.exports = {
   userRouter, 
  };
