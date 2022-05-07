import { NextFunction, Response } from "express";
import Joi from "joi";
import { nextTick } from "process";
import { ContestData } from "../../types/Contest";
import { Lang } from "../../types/LangTypes";
import { RequestWithUser } from "../../types/RequestWithUser";

export const schema = Joi.object({
    title:Joi.string().required(),
    desc:Joi.string().required(),
    date:Joi.date().max("now").required(),
})


export const contestSchemaValidation = async (req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const {lang} = req.params as {lang:Lang["types"]}
        const {date,desc,title} = req.body as ContestData
        const {error} = schema.validate(req.body)
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        if(!req.file?.path)
            return res.status(400).json({error:true,message:"Image is required"})
        req.body2 = {
            body:{
                [`title_${lang}`]:title,
                [`desc_${lang}`]:desc,
                date,
                img:req.file.path
            }
        }
        return next()
    } catch(e){
        res.status(500).json({error:true,message:e})
    }
}