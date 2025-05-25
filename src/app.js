const express=require('express');
//this needed if we handle function call of connectDb in database.js
// require("./config/database.js");
const connectDb=require('./config/database');
const bcrypt=require("bcrypt");
const validator=require("validator");
const validateSignUpData=require('./utils/validation');
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
app.use(express.json())
app.post("/signup",async(req,res)=>{
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
app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    
    try{
//validation
    
    if(!validator.isEmail(email)){
        throw new Error("Invlaid credentials");
    }
    //Authentication
    const user=User.findOne({email:email});
    if(!user){
        res.status(500).send("User not present");
    }
    else{
        if(bcrypt.compare(password,user.password)){
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
//this api is to get specific user with the requested email
app.get("/user",async(req,res)=>{
    try{
    const users=await User.find({email:req.body.email});
    if(users.length===0){
        res.status(401).send("User not found");
    }
    else{
        res.send(users);
    }
    }catch(err){
        console.error("something went wrong");
        res.status(400).send("something went wrong");
    }
})
//this is to get all the users from the database
app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find({});
        if(users.length===0){
            res.status(401).send("No users are there");
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        console.error("something went wrong");
        res.status(400).send("something went wrong");
    }
})

//we handled it in connectDb promise bcoz server need to listen only after database connection establishment
// app.listen(3000,()=>{
//     console.log("app is running succsefully");
// })