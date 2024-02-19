import { ObjectId } from "mongodb";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    resetPasswordToken:{
        type:String,
    
      },
      resetPasswordExp:{
        type:String,
      },
      url_Id:[{type:mongoose.Types.ObjectId,ref:"Url"}],
})

const User = mongoose.model("User",userSchema);

export {User};