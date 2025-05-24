const adminAuth=(req,res,next)=>{
    const test="xyz";
    if(test==="xyz"){
        next();
    }
    else{
        res.status(401).send("Authentication failed");
    }
}
module.exports={adminAuth};