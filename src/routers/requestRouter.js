const express=require('express');
const requestRouter=express.Router();
const ConnectionRequestModel=require("../models/connectionRequest");
const {userAuth}=require("../middlewares/userAuth");
const User=require("../models/user");
requestRouter.post("/request/send/:status/:userId",userAuth,async (req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.userId;
        const status=req.params.status;
        const toUser=await User.findById(toUserId);
        if(!toUser){
            console.log("error is to user");
            throw new Error("user not found");
        }
        const checkDuplicate=await ConnectionRequestModel.findOne({
            $or:[
                {fromUserId,toUserId},
                {
                    fromUserId:toUserId,
                    toUserId:fromUserId
                }
            ]
        });
        if(checkDuplicate){
            console.log("error is to checkDuplicate");
            throw new Error("duplicate request");
        }
        if(fromUserId==toUserId){
            console.log("error is to equal");
            throw new Error("can't send request to own account");
        }
        const connectionRequest=new ConnectionRequestModel({
            fromUser:fromUserId,
            toUser:toUserId,
            status
        });
        const data=await connectionRequest.save();
        res.json({
            message:"connection success",
            data,
        })

    }catch(err){
        res.status(400).send(err.message);
    }

});
requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
    try{

    
    const status=req.params.status;
    console.log(status);
    const allowed=["accepted","rejected"];
    if(!allowed.includes(status)){
        console.log("error is in status");
        throw new Error("status not allowed");
    }
    const dbCheck=await ConnectionRequestModel.findOne({
        fromUser:req.params.requestId,
        toUser:req.user._id,
        status:"intrested"
    });
    if(!dbCheck){
        console.log("error is bcoz of db");
        throw new Error("invalid connection request");
    }
    dbCheck.status=status;
    const data=await dbCheck.save();
    res.json({
        message:"success",
        data
    })
}
catch(err){
    res.status(400).send(err.message);
}


})
module.exports=requestRouter;