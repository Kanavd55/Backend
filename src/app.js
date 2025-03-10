const express = require('express');

const app =express();

app.get("/user",(req,res)=>{

    console.log(req.query)
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

app.post("/hello",async (req,res)=>{
    res.send("Data saved successfully to the db ")
})


app.get("/",(req,res)=>{
    res.send("Hell")
})

app.listen(3000,()=>{
    console.log("server is listening")
});