const express = require('express');

const app =express();

app.use("/",(req,res)=>{
    res.send("Hell")
})

app.use("/test",(req,res)=>{
    res.send("Hello World")
})

app.listen(3000,()=>{
    console.log("server is listening")
});