const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcrypt");
const otpGnerator = require("otp-generator");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const {passwordUpdated} = require("../mail/templates/passwordUpdate");


exports.sendotp = async(req,res)=>{

    try{
        const {email} = req.body;

        const checkUserPresent = await User.findOne({email});
    
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message:"User is already registered with this mail id",
            });
        }
    
        var otp = otpGnerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
    
        console.log("OTP generated is ",otp);
    
        const result = await Otp.findOne({otp});
    
        while(result){
            otp = otpGnerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
    
            result = await Otp.findOne({otp});
        }
    
        const otpPayload = {email,otp};
    
        const otpBody = await Otp.create(otpPayload);
        console.log("Otp body that is created in databse is ",otpBody);
    
        res.status(200).json({
            success:true,
            message:"OTP Entry is Created in DB and sent successfully to the user",
            otpBody
        });
    }
    catch(error){
        console.log("There is error in generation of Otp");
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.signup = async(req,res) =>{
    try{
        console.log("1");
        const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp} = req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp ){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            });
        }
        console.log("2");

        if(password != confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm password does not match",
            });
        }

        console.log("3");
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already registerd with this mail id",
            });
        }

        console.log("4");
        const recentOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);
        console.log("Hello everyone");
        console.log("Recent Otp is ",recentOtp);
        
        console.log("Equal or not ",recentOtp[0].otp);
        console.log("Otp is ",otp);
        if(recentOtp.length == 0){
            return res.status(400).json({
                success:false,
                message:"Otp not found"
            })
        }

        // console.log("6");

        
        else if(otp != recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Otp does not match"
            });
        }

        console.log("5");

        const hashPassword = await bcrypt.hash(password,10);

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        const user = await User.create({
            firstName,lastName,email,contactNumber,password:hashPassword,accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        res.status(200).json({
            success:true,
            message:"User entry created in DB successfully",
        });
    }
    catch(error){
        console.log("There is error in creating user entry in DB");
        return res.status(500).json({
            success:false,
            message:"User cannot be regitered, please try again",
        })
    }
}

exports.login = async(req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            });
        }

        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered with this mail id, please SignUp first",
            })
        }

        if(await bcrypt.compare(password,user.password)){

            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }

            const token = await jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpsOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                message:"User logged in sucecssfully",
                token,
                user
            });
        }
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Login failure, please try again",
        });
    }
}

exports.changePassword = async(req,res) =>{
    try{

        const {oldPassword,newPassword,confirmNewPassword} = req.body;

        const userId = req.user.id;

        const temp = await User.findById(userId);

        const isPasswordMatch = await bcrypt.compare(oldPassword,temp.password);

        if( !isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"You have entered the wrong old password",
            })
        }

        if(!oldPassword || ! newPassword || !confirmNewPassword){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }

        if(newPassword!=confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"NewPassword and Confirm New password does not match",
            });
        }

        const hashPassword = await bcrypt.hash(newPassword,10);

        const updatedUser = await User.findByIdAndUpdate(userId,{password:hashPassword},{new:true});

        const mailResponse = await mailSender(updatedUser.email,'Password Updation',passwordUpdated(updatedUser.email,updatedUser.firstName));

        console.log("Mail has been sent successfully after updating password : ",mailResponse);

        return res.status(200).json({
            success:true,
            message:"Password has been updated successfully !!",
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error Occured while updating password, please try again",
        });
    }
}