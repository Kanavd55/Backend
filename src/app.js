const {adminAuth,userAuth} = require("./middlewares/auth")
const express = require('express');
const connectDB = require("./config/database")
const User = require('./models/user')
const app =express();

app.use(express.json());  //To convert json object into js object
app.get("/user",async (req,res,next)=>{
    const userEmail = req.body.emailId;
    try{
        const user =await User.find({emailId:userEmail});
        if(user.length === 0){
            res.status(200).send("Something went wrong")
        }else{
            res.send(user)
        }
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

app.get("/feed",async (req,res,next)=>{
    try{
        const users =await User.find({});
        res.send(users)
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

app.delete("/user",async (req,res)=>{
    try{
        const userId = req.body.userId;
        const user = await User.findByIdAndDelete(userId)
        res.send("user deleted successfully")
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

app.patch("/user",async (req,res)=>{
    const userId = req.body.userId;
    const data = req.body;
    const ALLOWED_UPDATES = ["userid","photurl","about","gender","age","skills"]
    const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k.toLowerCase()));
    if(!isUpdateAllowed){
        throw new Error("Update not allowed")
    }
    if(data?.skills?.length>10){
        throw new Error("Skills cannot be more than 10")
    }
    try{
        const user = await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after",runValidators:true})
        res.send("User updated successfully")
    }catch(err){
        res.status(400).send("something went wrong")
    }
})

app.get("/user",adminAuth,(req,res)=>{
    
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

app.post("/signup",async (req,res)=>{
    const user = new User(req.body);
    try{
        await user.save()
        res.send("user added successfully")
    }catch(err){
        res.status(400).send("Error saving data",err.message)
    }
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