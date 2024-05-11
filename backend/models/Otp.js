const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const {otpTemplate} = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});

async function sendVerificationEmail(email,otp){
    try{
        console.log("This is the name of the person : ");
        const mailResponse = await mailSender(email,"Verification email from StudyNotion",otpTemplate(otp));
        console.log("Email sent successfullu : ",mailResponse);
    }
    catch(error){
        console.log("Error Ocurred while Sending mail ");
        console.error(error.message);
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("Otp",otpSchema);