const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/userAuth");
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");
userRouter.get("/user/requests/recieved",userAuth,async (req,res)=>{
    try{
        const allRequests=await ConnectionRequest.find({
            toUser:req.user._id,
            status:"intrested"
        }).populate("fromUser",["firstName","lastName"]);
        res.json({
            message:"success",
            allRequests
        })

    }catch(err){
        res.status(400).send(err.message);
    }
})
userRouter.get("/user/connections",userAuth,async (req,res)=>{
    const allConnections=await ConnectionRequest.find({
        $or:[
            {fromUser:req.user._id},
            {
                toUser:req.user._id,
            }

        ]
    }).populate("fromUser",["firstName","lastName"]).populate("toUser",["firstName","lastName"]);

    const realData=allConnections.map((row)=>{
        if(row.fromUser._id.toString()===req.user._id.toString()){
            return row.fromUser;
        }
        return row.toUser;
    });
    res.send(realData);
})
userRouter.get("/feed",userAuth,async (req,res)=>{
    try{
     const page=parseInt(req.query.page)||1;
     let limit=parseInt(req.query.limit)||10;
     limit=limit>50?50:limit;
     const skip=(page-1)*limit;
    
    const loggedInUser=req.user;
    const connectionData=await ConnectionRequest.find({
        $or:[
            {fromUser:loggedInUser._id},
            {toUser:loggedInUser._id}
        ]
    }).select(["fromUser","toUser"]);
    console.log(connectionData);
    const notAllowedData=new Set();
    connectionData.map((data)=>{
        notAllowedData.add(data.fromUser);
        notAllowedData.add(data.toUser);
    })
    console.log(notAllowedData);
    const data=await User.find({
        $and:[
            {_id:{$nin:Array.from(notAllowedData)}},
            {_id:{$ne:loggedInUser._id}}
        ]
    }).select(["firstName","lastName","about"]).skip(skip).limit(limit)
    res.json({
        message:"your feed is",
        data
    })
}catch(err){
    res.status(400).send("something went wrong in feed"+err.message)
}

})
module.exports=userRouter;