const { userAuth } = require("./middlewares/auth");
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json()); //To convert json object into js object
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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
    console.log(user);
    await user.save();
    res.status(200).send("user added successfully");
  } catch (err) {
    res.status(400).send("Error saving data", err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    //console.log(user)
    if (!user) {
      throw new Error("Invalid Crendentials");
    }
    //console.log(user)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (isPasswordValid) {
      //Create a JWT token
      const token = await jwt.sign({ _id: user._id }, "DEVTINDER$790",{expiresIn:new Date(Date.now() + 8 * 3600000)});
      res.cookie("token", token);
      res.send("Login successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Invalid Credentials");
  }
});

app.get("/profile", async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Invalid token");
  }
});

app.post("/sendConnectionRequest",userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName+" sent the connection request");
  } catch (err) {
    res.status(400).send("Invalid token");
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("server is listening");
    });
  })
  .catch(() => {
    console.error("Database cannot be connected");
  });
