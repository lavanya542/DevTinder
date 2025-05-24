const express=require('express');
//this needed if we handle function call of connectDb in database.js
// require("./config/database.js");
const connectDb=require('./config/database');
const app=express();
connectDb().then(()=>{
    console.log("Database connection established succsefully");
    app.listen(3000,()=>{
        console.log("our port is now listening");
    })
}).catch((err)=>{
    console.error("Can't able to connect to database");
})

//we handled it in connectDb promise bcoz server need to listen only after database connection establishment
// app.listen(3000,()=>{
//     console.log("app is running succsefully");
// })