import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import {ObjectId} from "mongodb"
import Department from "../../../models/deparments";
import Teachers from "../../../models/teacher";

const schema = Joi.object({
    teacherId:Joi.string().hex().length(24).required(),
    departmentId:Joi.string().hex().length(24).required(),
    reception_time_starts:Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
    reception_time_ends:Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
})


const adminstrationsValidation = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {error} = await schema.validate(req.body)
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        if(!Teachers.exists({_id:new ObjectId(req.body.teacherId)}))
            return res.status(404).json({error:true,message:"teacher not found"})
        if(!Department.exists({_id:new ObjectId(req.body.departmentId)}))
            return res.status(404).json({error:true,message:"department not found"})
        return next()
    } catch(e){
        return res.status(500).json({error:true,message:e})
    }
}

export default adminstrationsValidation;