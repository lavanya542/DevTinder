//here we will define the user schema and creates the user model and export the model
const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:15,
    },
    gender:{
        type:String,
        lowercase:true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new error("Gender data is invalid");
            }
        }
    },
    about:{
        type:String,
        default:"If not entered anything this will be the about"
    }
},{timestamp:true});
const User=mongoose.model('User',userSchema);
module.exports=User;