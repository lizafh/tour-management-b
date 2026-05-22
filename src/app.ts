import express, { Request, Response } from "express";
import {Server} from "http";
import mongoose from "mongoose";



const app = express()

app.get("/", (req:Request, res:Response)=>{
    res.status(200).json({
        message:"Welcome to Tour Management System Backend"
    })
})

export default app