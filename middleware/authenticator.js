const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function authenticator(req,res,next){
   const token=req.headers.authorization
   jwt.verify(token,"bharath",(err,decode)=>{
    if(err) return res.send({
        message:"Invalid Token please login",
        status:2
    })
    if(decode){
        req.body.user=decode.user
        next()
    }else{
        res.send({
            message:"Invalid Token please login",
            status:2
        })
    }
   })
}

module.exports={
    authenticator,
}