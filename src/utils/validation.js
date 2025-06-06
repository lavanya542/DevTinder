const validator=require('validator');
const validateSignUpData=(req)=>{
    const {firstName,lastName,email,password}=req.body;
    if(!firstName||!lastName){
        throw new Error("Invalid Data");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Not a Valid Email");

    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong password");
    }
}
const profileEditValidation=(req)=>{
    const allowedFields=["firstName","lastName","about"];
    const isValid=Object.keys(req.body).every((field)=>allowedFields.includes(field));
    return isValid;
}

module.exports={validateSignUpData,profileEditValidation}