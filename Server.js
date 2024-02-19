import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { connectingToDb } from "./db.js";
import { userRouter } from "./Router.js/User.js";
import { urlRouter } from "./Router.js/Url.js";
dotenv.config();

const App =express();
const PORT=process.env.PORT;

App.use(cors());
App.use(express.json());

App.use("/api/user",userRouter)
App.use("/api",urlRouter);

App.listen(PORT,()=>{
    console.log("Server connected with port : "+PORT)
})


connectingToDb();