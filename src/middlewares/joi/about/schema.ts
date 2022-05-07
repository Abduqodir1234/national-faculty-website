import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Lang } from "../../types/LangTypes";
import { RequestWithUser } from "../../types/RequestWithUser";

const schema = Joi.object({
    desc:Joi.string().required()
})

export const aboutSchemaValidation = (req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const lang = req.params.lang as Lang["types"]
        const {error} = schema.validate(req.body)
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        req.body2={
            body:{
                [`desc_${lang}`]:req.body.desc
            }
        }
        return next()
    } catch(e){
        return res.status(500).json({error:true,message:e})
    }
}
export default aboutSchemaValidation;