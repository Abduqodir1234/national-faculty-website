import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import {ObjectId} from "mongodb"
import Department from "../../../models/deparments";
import DepartmentMajors from "../../../models/departmentMajors";
import Majors from "../../../models/majors";

export const schema = Joi.object({
    majorId:Joi.string()
        .hex()
        .length(24)
        .required(),
    departmentId:Joi.string()
        .hex()
        .length(24)
        .required(),
    degree:Joi.string()
        .valid("bachelor","master","doctoral")
        .required(),
    code:Joi.string().required()
})

const departmentMajorsCreateValidation = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {departmentId,majorId,code} = req.body
        const {error} = schema.validate(req.body)
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        // Check if department exists with given id
        if(!await Department.exists({_id:new ObjectId(departmentId)}))
            return res.status(404).json({error:true,message:"Department not exist"})
        // Check if Major exists with given id
        if(!await Majors.exists({_id:new ObjectId(majorId)}))
            return res.status(404).json({error:true,message:"major not exist"})
        //Check if given code is unique
        if(await DepartmentMajors.exists({code}))
            return res.status(400).json({error:true,message:"data exists with this code"})
        return next()
    } catch(e){
        return res.status(500).json({error:true,message:e,data:null})
    }
}

export default departmentMajorsCreateValidation; 