import { NextFunction, Response } from "express"
import ResourceCategory from "../../../models/resourceCategory"
import { Lang } from "../../types/LangTypes"
import { RequestWithUser } from "../../types/RequestWithUser"
import { schema } from "./schema"
import {ObjectId} from "mongodb"

export const resourcesUpdateSchemaValidation = async (req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const {error} = schema.validate(req.body)
        const {lang} = req.params as {lang:Lang["types"]}
        const {title,desc,categoryId} = req.body
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        if(!await ResourceCategory.exists({_id:new ObjectId(req.body.categoryId)}))
            return res.status(400).json({error:true,message:"category not exist"})

        req.body2={
            body:{
                [`title_${lang}`]:title,
                [`desc_${lang}`]:desc,
                categoryId,
            }
        }

        if(req.file?.path)
            req.body2={
                body:{
                    [`title_${lang}`]:title,
                    [`desc_${lang}`]:desc,
                    categoryId,
                    file:req.file.path
                }
            }
        
        return next()
    } catch(e){
        return res.status(500).json({error:true,message:e})
    }
}
export default resourcesUpdateSchemaValidation;