const express=require('express');
const cors=require('cors');
//this needed if we handle function call of connectDb in database.js
// require("./config/database.js");
const connectDb=require('./config/database');
const cookieParser=require('cookie-parser');
const authRouter=require('./routers/authRouter');
const requestRouter=require('./routers/requestRouter');
const profileRouter=require('./routers/profileRouter');
const userRouter=require('./routers/userRouter');
const app=express();



const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));
 
  
  
  // Handle OPTIONS preflight for all routes explicitly:
  
    
app.use(express.json());
app.use(cookieParser());
//we will add routers here

app.use('/',authRouter);
app.use('/',requestRouter);
app.use('/',profileRouter);
app.use('/',userRouter);
//login api

//this api is to get specific user with the requested email

//this is to get all the users from the database


//we handled it in connectDb promise bcoz server need to listen only after database connection establishment
// app.listen(3000,()=>{
//     console.log("app is running succsefully");
// })
connectDb().then(()=>{
    console.log("Database connection established succsefully");
    app.listen(3000,()=>{
        console.log("our port is now listening");
    })
}).catch((err)=>{
    console.error("Can't able to connect to database");
})