import {RequestWithUser} from "../../types/RequestWithUser";
import {NextFunction, Response} from "express";
import {ObjectId} from "mongodb";
import {schema} from "./create";
import Teachers from "../../../models/teacher";

const departmentUpdateValidation =async (req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const {error} = schema.validate(req.body)
        const {body:{name,dean,desc,address},params:{lang}} = req
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        if(dean && !await Teachers.exists({_id:new ObjectId(dean)}))
            return res.status(400).json({error:true,message:"Teacher not found"})
        req.body2 = {
            body:{
                'dean':dean,
                [`name_${lang}`]:name,
                [`desc_${lang}`]:desc,
                [`address_${lang}`]:address
            }
        }
        return next()
    } catch (e) {
        return res.status(500).json({error:true,message:e})
    }
}
export default departmentUpdateValidation;