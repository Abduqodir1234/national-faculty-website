import Joi from "joi";
import {NextFunction, Request, Response} from "express";
import Deparments from "../../../models/deparments";
import {ObjectId} from "mongodb";

export const schema = Joi.object({
    fullname:Joi.string().required(),
    title:Joi.string().required(),
    educationTitle:Joi.string()
        .valid(
            "Stajor_oqituvchi",
            "oqituvchi",
            "katta_oqituvchi",
            "dotsent",
            "professor",
            "akademik"
        )
        .required(),
    birthdate:Joi.date().required(),
    passportSeries:Joi.string()
        .length(2)
        .case("upper")
        .pattern(new RegExp(/^[a-zA-Z]+$/))
        .required(),
    passportNumber:Joi.string()
        .length(7)
        .pattern(new RegExp(/^[0-9]*$/))
        .required(),
    email:Joi.string()
        .email()
        .required(),
    is_MA:Joi.boolean().required(),
    study_foreign:Joi.boolean().required(),
    departmentId:Joi.string().required(),
    dateOfEntry:Joi.date()
        .max("now")
        .required()

})


const teacherCreateValidation = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const {error} = schema.validate(req.body)
        if(error?.details)
            return res.status(400)
                .json({error:true,message:error.details[0].message})
        if(!await Deparments.exists({_id:new ObjectId(req.body.departmentId)})){
            return res.status(400)
                .json({error:true,message:"Department not exist"})
        }
        if(req.file?.path){
            req.body.image=req.file.path
        }
        return next()
    }
    catch (e){
        console.log(e);
        
        res.status(500).json({error:true,message:e})
    }
}
export default teacherCreateValidation