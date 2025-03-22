const express = require("express");
const userRouter = express.Router()
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest");
const USER_SAFE_DATA = "firstName lastName PhotoUrl age gender about skills"

//Get all the pending connection requests for logged in user
userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId","firstName lastName PhotoUrl age gender about skills");
        res.json({
            message:"Data fetched successfully",
            data:connectionRequest
        })
    } catch (error) {
        res.send(
            "Error"+ err.message
        )
    }
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try {
        const loggedInUser=req.user;
        connectionRequest = await ConnectionRequest.find({
            $or:[{
                toUserId:loggedInUser._id,status:"accepted"
            },{
                fromUserId:loggedInUser._id,status:"accepted"
            }]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA)
        const data = connectionRequest?.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId;
        })
        res.json({data})
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = userRouter;