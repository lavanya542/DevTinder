const express=require('express');
const app=express();
app.get("/",(req,res)=>{
    res.send("This is the home page");

})
app.get("/hello",(req,res)=>{
    res.send("This is the hello page");

})
app.post("/hello",(req,res)=>{
    res.send("This is of post message");
})
app.delete("/hello",(req,res)=>{
    res.send("This is for deleting");
})
app.listen(3000,()=>{
    console.log("app is running succsefully");
})