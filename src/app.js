const express=require('express');
//this needed if we handle function call of connectDb in database.js
// require("./config/database.js");
const connectDb=require('./config/database');
const User=require("./models/user");
const app=express();
connectDb().then(()=>{
    console.log("Database connection established succsefully");
    app.listen(3000,()=>{
        console.log("our port is now listening");
    })
}).catch((err)=>{
    console.error("Can't able to connect to database");
})
app.post("/signup",async(req,res)=>{
    const userObj={
        firstName:"Lavanya",
        lastName:"Rokkam",
        email:"rokkamanu542@gmail.com",
        password:"Lavanya542@",
        age:21,
        gender:"Female"
    }
    const user=new User(userObj); //creating new instance from the User model using userObj data
    //now we need to save the user instance into the database
    try{
        await user.save();
        res.send("Data saved succsefully");

    }catch(err){
        console.error("data didn't saved");
        res.status(500).send("something went wrong");
    }
   

})

//we handled it in connectDb promise bcoz server need to listen only after database connection establishment
// app.listen(3000,()=>{
//     console.log("app is running succsefully");
// })