const jwt=require("jsonwebtoken");
const User=require("../models/user");
const userAuth=async (req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            console.log("token not found");
            throw new Error("invalid credentials");
        }
        const decodedData=jwt.verify(token,"DEV@Tinder$790");
        const {_id}=decodedData;
        console.log(_id);
        const user=await User.find({_id:_id});
        if(!user){
            console.log("user not found");
            throw new Error("user not found");
        }
        req.user=user;
        next();


    }catch(err){
        console.log("error is here",err.message);
        res.status(400).send("something went worng");
    }
   
}
module.exports={userAuth};