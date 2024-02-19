import  express  from "express";
import { forgotPass, loginUser, new_password, userRegister, verifyOtp } from "../Controller/User.js";



const Router = express.Router();


Router.post("/register",userRegister);

Router.post("/login",loginUser);

Router.post("/forgot_pass",forgotPass);

Router.post("/forgot_pass/:token",verifyOtp);

Router.post("/forgot_pass/:token/new_pass",new_password)

export const userRouter = Router;