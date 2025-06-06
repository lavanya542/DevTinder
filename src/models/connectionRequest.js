const { timeStamp } = require('console');
const mongoose=require('mongoose');
const connectionRequestSchema=new mongoose.Schema({
    fromUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    toUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["intrested","accepted","rejected",""],
            message:`{value} is not a status type`,
        }
    },},
    {
        timeStamp:true
        
    },
);
const ConnectionRequestModel=new mongoose.model("connectionRequestModel",connectionRequestSchema);
module.exports=ConnectionRequestModel;