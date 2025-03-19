const express = require("express");
const requestRouter = express.Router()
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth, async (req, res) => {
  try {
    const allowedStatus = ["ignored","interested"]
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status
    if(!allowedStatus?.includes(status?.toLocaleLowerCase())){
      return res.status.json({
        message:"Invalid status type" + status
      })
    }
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
      ]
    })
    if(existingConnectionRequest){
      return res.status(400).json({
        message:"Connection request already exists!!"
      })
    }
    const toUser = await user.findById(toUserId);
    if(!toUser){
      return res.status(400).json({
        message:"User not found"
      })
    }
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })

    const data = await ConnectionRequest.save();
    res.json({
      message:req.user.firstName+" is "+ status + " in " + toUser.firstName,
      data
    })
  } catch (err) {
    res.status(400).send("Error:"+ err.message);
  }
});


module.exports = requestRouter;