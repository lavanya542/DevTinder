const express=require('express');
const authRouter=express.Router();
const {validateSignUpData}=require('../utils/validation');
const bcrypt=require("bcrypt");
const User=require("../models/user");
const jwt=require('jsonwebtoken');
const validator=require("validator");
//signup api
authRouter.post("/signup",async(req,res)=>{
    //this is the dummy data
    // const userObj={
    //     firstName:"Lavanya",
    //     lastName:"Rokkam",
    //     email:"rokkamanu542@gmail.com",
    //     password:"Lavanya542@",
    //     age:21,
    //     gender:"Female"
    // }
   // const user=new User(userObj); 
   //creating new instance from the User model using userObj data
    //now we need to save the user instance into the database
    //handling dynamic data
  

   
    try{
          //validation
          validateSignUpData(req);
          const {firstName,lastName,email,password}=req.body;
          //encryption
          const encryptedPassword=await bcrypt.hash(password,10);

        const user=new User({
            firstName,
            lastName,
            email,
            password:encryptedPassword
        });
        await user.save();
        res.send("Data saved succsefully");

    }catch(err){
        console.error(err);
        res.status(500).send("something went wrong");
    }
   

})
//login api
authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    
    try{
//validation
    
    if(!validator.isEmail(email)){
        throw new Error("Invlaid credentials");
    }
    //Authentication
    const user=await User.findOne({email:email});
    if(!user){
        res.status(500).send("User not present");
    }
    else{
        const isValidPassword= bcrypt.compare(password,user.password);
        if(isValidPassword){
            //If it is valid password then we need to send a cokkie with a token
            // res.cookie("token","alslejoihtbpoeidngguiurhbaiuhrgbriri");
            //above one is normal cookie
            //now creating jwt 
            const token= jwt.sign({_id:user._id},"DEV@Tinder$790");
            res.cookie("token",token);
            res.send("Login succsefull");
        }
        else{
            res.status(500).send("Login unsuccsesfull");
        }
    }

}
catch(err){
    console.log(err.message);
    res.status(500).send("something went wrong");
}

})
authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.send("logout succsefully");
})

module.exports=authRouter;