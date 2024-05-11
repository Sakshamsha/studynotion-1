const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async(email,title,body) => {
    try {
        console.log("I am in mailSender");
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
            tls : { rejectUnauthorized: false }
        })

        console.log("first");
        let info = await transporter.sendMail({
            from:`StudyNotion || Codehelp - by Babbar`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })

        console.log("second");

        console.log("Printing the info afetr sending mail : ",info);
        return info;
    }
    catch (error) {
        console.log("There is some error in sending mail");
        console.error(error.message);
    }
}

module.exports = mailSender;