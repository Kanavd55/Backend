const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message: '{VALUE} is incorrect status type'
        }
    },
},{
    timeseries:true
})

connectionRequestSchema.index({fromUserId:1,toUserId:1})

connectionRequestSchema.pre('save',function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself!!")
    }
    next()
    //The above is middleware which will be called before saving that is why 
    // it is called as pre & it is not mandatory.you can do this validation in api itself
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports = ConnectionRequestModel