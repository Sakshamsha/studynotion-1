const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req,res,next)=>{
    try{

        const token =  req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        console.log("token is",token);

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            });
        }

        try{
            console.log("hello jee");
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            console.log("hellp");
            console.log("Decode = ",decode);
            req.user = decode;

        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
                error:error,
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token",
        });
    }
}

exports.isStudent = async(req,res,next) => {
    try{
        if(req.user.accountType!=='Student'){
            return res.status(401).json({
                success:false,
                message:"This is protected route for student only",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified,pleae"
        })
    }
}

exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.accountType!=='Admin'){
            return res.status(401).json({
                success:false,
                message:"This is protected route for admin only",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified,pleae"
        })
    }
}

exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.accountType!=='Instructor'){
            return res.status(401).json({
                success:false,
                message:"This is protected route for instrucor only",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified,pleae"
        })
    }
}