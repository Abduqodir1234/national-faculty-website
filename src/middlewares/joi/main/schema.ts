import {NextFunction, Response } from "express";
import Joi from "joi";
import { Lang } from "../../types/LangTypes";
import { RequestWithUser } from "../../types/RequestWithUser";

const mainInfosSchema = Joi.object({
    email:Joi.string().email().required(),
    phoneNumber:Joi.string().required(),
    address:Joi.string().required(),
    coordinate_x:Joi.number(),
    coordinate_y:Joi.number(),
    facebook:Joi.string().uri().pattern(/(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/?/),
    instagram:Joi.string().uri().pattern(/(?:(?:http|https):\/\/)?(?:www.)?instagram.com\/?/),
    telegram:Joi.string().uri().pattern(/(?:(?:http|https):\/\/)?(?:www.)?telegram.org\/?/),
    youtube:Joi.string().uri().pattern(/(?:(?:http|https):\/\/)?(?:www.)?youtube.com\/?/),
    startWork:Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
    endWork:Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required() 
})

const mainInfosSchemaValidator = async (req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const {error} = mainInfosSchema.validate(req.body)
        const lang = req.params.lang as Lang["types"]
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        req.body2 = {
            body:{
                ...req.body,
                [`address_${lang}`]:req.body.address
            }
        }
        if(req.file?.path)
            req.body2 = {body:{...req.body2?.body,img:req.file.path}}
        return next()
    } catch(e){
        return res.status(500).json({error:true,message:e})
    }
}
export default mainInfosSchemaValidator;