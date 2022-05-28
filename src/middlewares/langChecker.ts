import { NextFunction, Request, Response } from "express";

const langChecker = (req:Request,res:Response,next:NextFunction) => {
    try{
        const lang = req.params.lang;
        if(!lang){
            return res.status(400).json({error:true,message:"Lang need to be provided"});
        }
        if(lang === "uz" || lang === "ru" || lang === "en")
            return next();
        else
            return res.status(400).json({error:true,message:"Lang is not supported"});
    }
    catch(e){
        return res.status(500).json({error:true,message:e});
    }
}
export default langChecker;