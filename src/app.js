const {adminAuth,userAuth} = require("./middlewares/auth")
const express = require('express');
const connectDB = require("./config/database")
const User = require('./models/user')
const app =express();

app.get("/user",(req,res,next)=>{

    console.log(req.query)
    next()
})

app.get("/user",adminAuth,(req,res)=>{
    res.send({
        firstname:"kanav",
        lastname:"Dahat"
    })
})

app.get("/user/:userId",(req,res)=>{

    console.log(req.params)
    res.send({
        firstname:"kanav",
    })
})

app.post("/user",async (req,res)=>{
    //creating a new instance
    const user = new User({
        firstName:"testing",
        lastName:"testing",
        password:"test"
    })
    await user.save();
    res.send("User Added successfully ")
})


app.get("/",(req,res)=>{
    res.send("Hell")
})

connectDB().then(()=>{
    console.log("Database connected successfully")
    app.listen(7777,()=>{
        console.log("server is listening")
    });
})
.catch(()=>{
    console.error("Database cannot be connected")
})