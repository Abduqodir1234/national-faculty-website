import jwt from "jsonwebtoken"
import { UserDocument } from "../models/user"
import ResponseService from "../services/response";
let createToken =async(user?:UserDocument) => {
    try{
        const tokenSecret = process.env.TOKEN_SECRET || ""
        const tokenValidity = process.env.TOKEN_VALIDITY 
        const token = await jwt.sign({sub:user},tokenSecret,{expiresIn:tokenValidity})
        return ResponseService.responseWithData(token)
    }
    catch(e){
        return ResponseService.badRequest(e)
    }
}
export default createToken