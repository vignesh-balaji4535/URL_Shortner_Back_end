import mongoose from "mongoose";
import shortid from "shortid";
import { User } from "../Module/User.js";
import {Url} from "../Module/Url.js"


export const createShortUrl = async (req,res,next)=>{

  const {long_url}=req.body;
  const {id}=req.params;
  let user;
  try {
    user = await User.findById(id);

    if(!user){
        return res.status(404).send("User Not Exist !!!")
    }


    const shortner = new Url({
        long_url:long_url,
        short_url:shortid.generate().slice(4)
    })

    const session = await mongoose.startSession();
        session.startTransaction();

        user.url_Id.push(shortner);

        await user.save({session});
        await shortner.save({session});

        session.commitTransaction();

        res.status(200).send("Short Id Created !!!")

        
    
  } catch (error) {
    return res.status(500).send(error);
  }

}


export const All_Url_Of_User = async (req,res,next) =>{

    let all_Url;
    try {
        all_Url=await Url.find();
        if(!all_Url){
            return res.status(404).send("Somthing Went Wornd !!!")
        }

        res.status(200).send(all_Url);
    } catch (error) {
    return res.status(500).send(error);
        
    }
}


export const trigger_url = async (req,res,next)=>{

    const {shortid}=req.params;
    let target;
try {
    target = await Url.findOne({short_url:shortid})

    target.clickCount = target.clickCount + 1;

    await target.save();

    res.redirect(target?.long_url);


} catch (error) {
    return res.status(500).send(error)
}

}

export const deleteData = async (req,res,next)=>{

    const {_id} = req.params;
    let deleted;
    try {
        deleted = await Url.findByIdAndDelete(_id);

        if(!deleted){
            return res.status(404).send("Not Founded !!!")
        }
        
 res.status(200).send("Url deleted successfully !!!")
    } catch (error) {
    return res.status(500).send(error)
        
    }
}




