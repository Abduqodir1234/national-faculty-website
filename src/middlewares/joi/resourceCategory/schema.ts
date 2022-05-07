import { NextFunction, Response } from "express";
import { Lang } from "../../types/LangTypes";
import { RequestWithUser } from "../../types/RequestWithUser";
import { NameSchema } from "../name";

export const resourceCategoryValidation = async (req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const {error} = NameSchema.validate(req.body)
        const lang = req.params.lang as Lang["types"]
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        req.body2={
            body:{
                [`name_${lang}`]:req.body.name
            }
        }
        return next()
    } catch(e){
        return res.status(500).json({error:true,message:e})
    }
}
export default resourceCategoryValidation;