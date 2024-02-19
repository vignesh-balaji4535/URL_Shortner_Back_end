import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    long_url:{
        type:String,
        require:true
    },
    short_url:{
        type:String,
        require:true
    },
    clickCount:{
        type:Number,
        default:0
    }
    ,
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true,
    }
})

 const Url = mongoose.model("Url",urlSchema);

 export {Url};