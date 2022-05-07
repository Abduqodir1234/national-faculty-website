import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { departmentSubjectDegrees } from "../../../config";
import Department from "../../../models/deparments";
import {ObjectId} from "mongodb"
import Subjects from "../../../models/subject";
const schema = Joi.object({
    subjectId:Joi.string().hex().length(24).required(),
    departmentId:Joi.string().required(),
    degree:Joi.string().valid(...departmentSubjectDegrees)
})


const departmentSubjectValidation = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {error} = schema.validate(req.body)
        //Error check for req.body
        if(error?.details)
            return res.status(400).json({error:true,msg:error.details[0].message})
        //Check department exists  
        if(!await Department.exists({_id:new ObjectId(req.body.departmentId)}))
            return res.status(400).json({error:true,msg:"Department not exist"})
        //Check subject exists  
        if(!await Subjects.exists({_id:new ObjectId(req.body.subjectId)}))
            return res.status(400).json({error:true,msg:"Subject not exist"})
        return next()
    } catch(e){
        return res.status(500).json({error:true,msg:e})
    }
}
export default departmentSubjectValidation;