import { NextFunction, Response } from "express";
import Joi from "joi";
import { Lang } from "../../types/LangTypes";
import { RequestWithUser } from "../../types/RequestWithUser";

const newsSchema = Joi.object({
    title: Joi.string().required(),
    short_desc: Joi.string().required(),
    desc: Joi.string().required(),
    date: Joi.date().required()
})


const newsSchemaValidator = (req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const lang = req.params.lang as Lang["types"]
        const {error} = newsSchema.validate(req.body)
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        req.body2 = {body:{
            [`title_${lang}`]:req.body.title,
            [`short_desc_${lang}`]:req.body.short_desc,
            [`desc_${lang}`]:req.body.desc,
            date:req.body.date
        }}
        if(req.file?.path)
            req.body2 = {body:{...req.body2?.body,img:req.file.path}}
        return next()
    } catch(e){
        return res.status(500).json({error:true,message:e})
    }
}
export default newsSchemaValidator;