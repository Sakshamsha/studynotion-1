const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
// const {passwordUpdated} = require("../mail/templates/passwordUpdate");/
const crypto = require("crypto");


exports.resetPasswordToken = async(req,res) =>{
    try{
        const {email} = req.body;

        const user = await User.findOne({email:email});

        console.log("Printing the user : ",user);

        if(!user){
            return res.status(401).json({
                success:false,
                message:"You are not registered with this mail id,please sign up first",
            });
        }

        const token = crypto.randomUUID();

        const updatedDetails = await User.findOneAndUpdate({email:email},
                                                            {token:token,resetPasswordExpires:Date.now() + 5*60*1000,},
                                                            {new:true});

        console.log("updatedDetails : ",updatedDetails);                                                    

        const url = `https://localhost:3000/update-password/${token}`;
        const mailResponse = await mailSender(email,"Password reset link",`Password reset link : ${url}`);
        console.log("mailResponse : ",mailResponse);

        return res.status(200).json({
            success:true,
            message:"Email send succesfully,please check Email and update password",
        })
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating password using link recieve on mail",
        });
    }
}

exports.resetPassword = async(req,res) => {
    try{
        const {password,confirmPassword,token} = req.body;

        if(password!=confirmPassword){
            return res.json({
                success:false,
                message:"Password and confirm password does not match in during the process of reseting the password",
            });
        }

        const userDetails = await User.findOne({token:token});

        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid",
            })
        }

        if(userDetails.resetPasswordExpires<Date.now()){
            return res.json({
                success:false,
                message:"Toekn is expired, please regenerate your token"
            });
        }

        const hashPassword = await bcrypt.hash(password,10);

        const updatedUser = await User.findOneAndUpdate({token:token},
                                                        {password:hashPassword},
                                                        {new:true});

        return res.status(200).json({
            success:true,
            message:"Password reset successfully",
        })                                                
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"There is some error in reseting of password",
        })
    }
}