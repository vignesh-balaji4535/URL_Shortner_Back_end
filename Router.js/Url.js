import express from "express";
import { All_Url_Of_User, createShortUrl, deleteData, trigger_url } from "../Controller/Url.js";



const Router = express.Router();


Router.post("/:id",createShortUrl);

Router.get("/all",All_Url_Of_User);

Router.get("/:shortid",trigger_url)

Router.delete("/delete/:_id",deleteData)



export const urlRouter = Router;