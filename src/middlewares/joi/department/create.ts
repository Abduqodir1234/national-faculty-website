import Joi from "joi";
import {NextFunction, Response} from "express";
import ResponseService from "../../../services/response";
import Department from "../../../models/deparments";
import {ObjectId} from "mongodb";
import {RequestWithUser} from "../../types/RequestWithUser";
import {defaultLang} from "../../../config";
import { Lang } from "../../types/LangTypes";
import Teachers from "../../../models/teacher";

export const schema = Joi.object({
    name:Joi.string().required(),
    dean:Joi.string(),
    desc:Joi.string().required(),
    address:Joi.string().required()
})


const departmentCreateValidation =async (req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const {error} = schema.validate(req.body)
        const {name,dean,desc,address} = req.body
        const lang = req.params.lang as Lang["types"]
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
export default departmentCreateValidation;