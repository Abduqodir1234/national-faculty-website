import { NextFunction, Response } from "express"
import Majors from "../../../models/majors"
import { RequestWithUser } from "../../types/RequestWithUser"
import { schema } from "./schema"

export const talentedUpdateSchemaValidation = async (req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const {error} = schema.validate(req.body)
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        if(!await Majors.exists({_id:req.body.majorId}))
            return res.status(400).json({error:true,message:"Major not exist"})
        if(req.file?.path)
            req.body.img = req.file.path
        return next()
    } catch(e){
        return res.status(500).json({error:true,message:e})
    }
}