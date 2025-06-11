const express=require('express');
const profileRouter=express.Router();
const User=require("../models/user");
const {userAuth}=require('../middlewares/userAuth');
const {profileEditValidation}=require("../utils/validation");


profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    //normal auth
    // try{
    // const users=await User.find({email:req.body.email});
    // if(users.length===0){
    //     res.status(401).send("User not found");
    // }
    // else{
    //     console.log(req.cookies);
    //     res.send(users);
    // }
    // }catch(err){
    //     console.error("something went wrong");
    //     res.status(400).send("something went wrong");
    // }
    try{
        
        // if(!email){
        //     console.log("email not valid");
        //     throw new Error("Invalid credentials");
        // }
        // const {token}=req.cookies;
        // if(!token){
        //     console.log("cookie not there");
        //     throw new Error("Invalid token");
        // }
        // else{
        //     const decodedmessage=jwt.verify(token,"DEV@Tinder$790");
        //     const {_id}=decodedmessage;
        //     const user=await User.find({_id:_id});
        //     if(!user){
        //         console.log("user not there");
        //         res.status(500).send("user not found");
        //     }
        //     res.send(user);
        // }
        //we have done authentication using middle ware
        const user=req.user;
        res.json({data:user});


    


    }catch(err){
       
        res.status(500).send("something went wrong",err.message);
    }
})
profileRouter.patch('/profile/edit',userAuth,async(req,res)=>{
    try{

    
    console.log("hi");
    if(!profileEditValidation(req)){
        throw new Error("validation fails");
    }
    const loggedInUser=req.user;
    Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
    await loggedInUser.save();
    res.json({
        "message":"user updated succsefully",
        "user":loggedInUser
    })
}catch(err){
    console.log(err.message);
}


})
module.exports=profileRouter;