import { NextFunction, Response } from "express"
import { Lang } from "../../types/LangTypes"
import { RequestWithUser } from "../../types/RequestWithUser"
import { NameSchema } from "../name"

const majorsSchema = (req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const {error} = NameSchema.validate(req.body)
        const lang = req.params.lang as Lang["types"]
        const errDetail = error?.details
        if(errDetail)
            return res.status(400).json({error:true,message:errDetail[0].message})
        req.body2 = {
            body:{
                [`name_${lang}`]:req.body.name
            }
        }
        next()
    }
    catch(e){
        return res.status(500).json({error:true,message:e})
    }
}

export default majorsSchema