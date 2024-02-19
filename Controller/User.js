import jwt from "jsonwebtoken";
import { User } from "../Module/User.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { sendOtpOnMail } from "../Mailer's/Otp_mailer.js";
dotenv.config();

export const userRegister = async (req,res ) =>{

    const {username,email,password}=req.body;

    let userExist;

    try {

        userExist =await User.findOne({email})

        if(userExist){
          return  res.status(404).send("User Already Exist !!!")
        }
         
        const salt =await bcryptjs.genSalt(10)

        let  hashedPassword =await bcryptjs.hash(password,10);

        const new_user =  new User({...req.body,password:hashedPassword})

             await new_user.save();

             const UserToken = jwt.sign({username,email},process.env.SECRECT_KEY)


         return   res.status(200).send({UserToken,new_user})
        
    } catch (error) {
        return res.status(500).send(error)
        
    }

}

export const loginUser = async(req,res)=>{

    let {email,password}=req.body;
    let user;

    try {
        user = await User.findOne({email});

        if(!user){
            return res.status(404).send("User doesn't Exist !!! ")
        }

 let passwordMatch = await bcryptjs.compare(password,user.password);
     
 
                  if(!passwordMatch){
                       return res.status(400).send("Incorrect Password !!!")
                  }

     let UserToken =await jwt.sign({username:user.username,email:user.email},process.env.SECRECT_KEY);

     return res.status(200).send({UserToken,user})


    } catch (error) {
        return res.status(500).send(error)
        
    }

}

export const  forgotPass = async (req,res)=>{
 
    const {email}=req.body;
    let user;

    try{
user = await User.findOne({email});

if(!user){
    return res.status(404).send("User Not Exist !!!")
}

let otp_token  = await jwt.sign({
    otp:Math.random().toString().slice(-4)
},process.env.SECRECT_KEY,{ expiresIn: "5m" });

user.resetPasswordToken = otp_token;
user.resetPasswordExp = Date.now()+36000000;

await user.save();

sendOtpOnMail(user);


res.status(200).send({
    message:"OTP-Mail Sent",
    otp_token,
    Date:user.resetPasswordExp
})

    }
    catch (error){
        return res.status(500).send(error)

    }
}


export const verifyOtp =async ( req,res,next ) =>{


    const param=req.params;
    const {otp}=req.body;

    try {
        
        

       const user = await User.findOne({resetPasswordToken:param.token})

        if(!user){
            return res.status(404).send("token not exist !!!")
        }

const token_1 = user.resetPasswordToken;

        const token__= await jwt.verify(token_1,process.env.SECRECT_KEY);

        const token_otp=token__.otp

        if(otp===token_otp){
            return res.status(200).send("Correct Password")
        }
        else{
            return res.status(404).send("Incorrect Password")
        }


    } catch (error) {
return res.status(500).send(error);
    }
}

export const new_password = async (req,res,next)=>{
      
    const {password}=req.body;
    const {token}=req.params
    try {
        
        let user = await User.findOne({resetPasswordToken:token})

        if(!user){
            return res.status(404).send("Token not Found !!!")
        }

        const hashedPassword = await bcryptjs.hash(password,10)

user.password=hashedPassword;
user.resetPasswordExp=null;
user.resetPasswordToken=null;

await user.save()

res.status(200).send("Password Changed Successfully")

    } catch (error) {
return res.status(500).send(error);
    }

}