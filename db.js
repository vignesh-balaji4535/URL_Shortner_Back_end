import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
export const connectingToDb=()=>{

    mongoose.connect(process.env.DB_URL,{})
    .then(()=>console.log("Connected To DB"))
    .catch((err)=>console.log(err.message))


}