import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const sendOtpOnMail = async(user)=>{

const opt_token = user.resetPasswordToken;

const {otp}=jwt.verify(opt_token,process.env.SECRECT_KEY)
console.log(otp)
var transporter = nodemailer.createTransport({
    service:"gmail",

    auth:{
        user:"vigneshbalaji453535@gmail.com",
        pass:"fffs mmdd hgbg envi"
    }})

    var mailOptions = {
        from: 'vigneshbalaji453535@gmail.com',
        to: `${user.email}`,
        subject: `OTP -${otp}`,
        text: `Your have recived a mail for password reset Request for your account,
        please use the follow OTP to reset your password :
        
                 OTP- : ${otp}.
        
        if you didn't request for password reset , kindly 
        ignore this mail`,
        
      };


transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Email-sent"+info.response)
    }
})


}