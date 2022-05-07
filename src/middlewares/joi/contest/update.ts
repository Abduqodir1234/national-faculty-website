import { NextFunction, Response } from "express"
import { ContestData } from "../../types/Contest"
import { Lang } from "../../types/LangTypes"
import { RequestWithUser } from "../../types/RequestWithUser"
import { schema } from "./schema"

export const contestUpdateValidation = async (req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const {lang} = req.params as {lang:Lang["types"]}
        const {date,desc,title} = req.body as ContestData
        const {error} = schema.validate(req.body)
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        req.body2 = {
            body:{
                [`title_${lang}`]:title,
                [`desc_${lang}`]:desc,
                date,
            }
        }
        if(req.file?.path){
            req.body2 = {
                body:{
                    ...req.body2.body,
                    img:req.file.path
                }
            }
        }
        return next()
    } catch(e){
        res.status(500).json({error:true,message:e})
    }
}
export default contestUpdateValidation