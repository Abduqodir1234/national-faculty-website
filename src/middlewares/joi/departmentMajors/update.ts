import { NextFunction, Request, Response } from "express"
import {ObjectId} from "mongodb"
import Department from "../../../models/deparments"
import Majors from "../../../models/majors"
import { schema } from "./create"

const departmentMajorsUpdateValidation = async (req:Request,res:Response,next:NextFunction) => {
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
        return next()
    } catch(e){
        return res.status(500).json({error:true,message:e,data:null})
    }
}

export default departmentMajorsUpdateValidation;