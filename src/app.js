const express=require('express');
const {adminAuth}=require('../middlewares/adminAuth');
const app=express();
//here adminAuth is a middleware for authentication we can use it anywhere
app.get("/admin",adminAuth,(req,res)=>{
    //error handling
    try{
        //this is how we throw errors in js
        // throw new Error("something went wrong");

        res.send("admin data");
        
        

    }
    catch(err){
        res.status(500).send("something went wrong");
    }
    
})
//this will catch any error which pass from the routes order matters if we put this before the route handlers then it didnt catch the errors
app.use("/",(err,req,res,next)=>{
    //use use only
    if(err){
        res.status(500).send("something went wrong");
    }
})
app.listen(3000,()=>{
    console.log("app is running succsefully");
})