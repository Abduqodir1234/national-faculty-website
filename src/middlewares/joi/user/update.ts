import Joi from "joi";
import {NextFunction, Response} from "express";
import Users from "../../../models/user";
import { RequestWithUser } from "../../types/RequestWithUser";

const update = Joi.object({
    fullname:Joi.string().required(),
    email:Joi.string().email().required(),
    // password:Joi.string()
    //     .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&+])[A-Za-z\d@+$!%*#?&+]{6,}$/)),
})
    // .when(Joi.object({password:Joi.exist()}).unknown(),{
    //     then:Joi.object({
    //         confirm_password:Joi.string().required().valid(Joi.ref('password')).required(),
    //     })
    // })


const userUpdateValidator = async (req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const {error} = update.validate(req.body)
        if(error?.details)
            return res.status(400).json({error:true,message:error.details[0].message})
        if(req.file)
            req.body.img = req.file.path
        if(req?.user?.email !== req.body.email && await Users.exists({email:req.body.email}))
            return res.status(400).json({error: true,message:"User exists with this email"})
        return next()
    } catch (e){
        return res.status(500).json({error: true,message:e})
    }
}
export default userUpdateValidator