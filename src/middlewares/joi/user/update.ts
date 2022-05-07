import Joi, {ref} from "joi";
import {NextFunction, Request, Response} from "express";
import hash from "../../hash";

const update = Joi.object({
    fullname:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string()
        .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&+])[A-Za-z\d@+$!%*#?&+]{6,}$/)),
})
    .when(Joi.object({password:Joi.exist()}).unknown(),{
        then:Joi.object({
            confirm_password:Joi.string().required().valid(Joi.ref('password')).required(),
        })
    })


const userUpdateValidator = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {error} = update.validate(req.body)
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        if(req.file)
            req.body.img = req.file.path
        if(req.body.password){
            const hashed= await hash(req.body.password)
            if(error) return  res.status(hashed.status).json({error:hashed.error,message:hashed.msg})
            req.body.password = hashed.data
        }
        return next()
    } catch (e){
        return res.status(500).json({error: true,message:e})
    }
}
export default userUpdateValidator