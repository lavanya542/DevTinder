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
    },
    photoUrl:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fdefault-profile-pic&psig=AOvVaw3ig0DH0DkIQ0TGOCNLRCut&ust=1749464827919000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJCHu8HO4Y0DFQAAAAAdAAAAABAE"
    }
},{timestamp:true});
const User=mongoose.model('User',userSchema);
module.exports=User;