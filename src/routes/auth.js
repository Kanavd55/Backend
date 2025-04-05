const express = require("express");
const authRouter = express.Router()
const User = require("../models/user")
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
    try {
      validateSignUpData(req);
      const { firstName, lastName, emailId, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
      const savedUser = await user.save();
      const token = savedUser.getJwt();
      res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)})
      res.json({message:"user added successfully",
        data:savedUser
    });
    } catch (err) {
      res.status(400).send("Error saving data"+ err.message);
    }
  });
  
  authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
      const user = await User.findOne({ emailId: emailId });
      //console.log(user)
      if (!user) {
        throw new Error("Invalid Crendentials");
      }
      //console.log(user)
      const isPasswordValid = await user.validatePassword(password)
      if (isPasswordValid) {
        //Create a JWT token
        const token = await user.getJwt();
        res.cookie("token", token);
        res.send(user);
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (err) {
      res.status(400).send("Invalid Credentials");
    }
  });

  authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    })
    res.status(200).send("logout successfull")
  })

  module.exports = authRouter;