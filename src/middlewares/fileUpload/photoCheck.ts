import {NextFunction, Request, Response} from "express";
import upload from "./index";

const PhotoCheck = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        await upload.single("img")(req,res,(err)=>{
            if(err){
                return  res.status(400).json({error:true,msg:err.message})
            }
            return  next()
        })
    }
    catch (e) {
        res.status(500).json(e)
    }
}
export default PhotoCheck