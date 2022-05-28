import Joi from "joi";
import {NextFunction, Request, Response} from "express";

const login = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

export const loginValidator = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {error} = login.validate(req.body)
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        return  next()
    }
    catch (e) {
        return res.status(500).json({error:true,message:e})
    }
}