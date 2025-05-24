//here we will connect to the database cluster
const mongoose=require('mongoose');
const connectDb=async()=>{
    await mongoose.connect("mongodb+srv://Lavanya:Lavanya542@cluster0.sqquu49.mongodb.net/");
}
//if we write this function call here then our server starts listening before our database connection established
//which is not correct so we write this function call in app.js and there we handle the function call and after the database connection we start listening to the port

// connectDb().then(()=>{
//     console.log("Database connected succsefully");
// }).catch((err)=>{
//     console.error("Can't connect to database");
// });
module.exports=connectDb;
