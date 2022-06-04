import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import Majors from "../../../models/majors";
import { RequestWithUser } from "../../types/RequestWithUser";

export const schema = Joi.object({
    fullname:Joi.string().required(),
    birthdate:Joi.date().less("now").required(),
    address:Joi.string().required(),
    title:Joi.string().required(),
    majorId:Joi.string().hex().length(24).required(),
    specialization:Joi.string().required(),
    desc:Joi.string().required()
})


export const talentedSchemaValidation = async (req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const {error} = schema.validate(req.body)
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        if(!await Majors.exists({_id:req.body.majorId}))
            return res.status(400).json({error:true,message:"Major not exist"})
        if(!req.file?.path)
            return res.status(400).json({error:true,message:"Photo is required"})
        req.body.img = req.file.path
        return next()
    } catch(e){
        return res.status(500).json({error:true,message:e})
    }
}