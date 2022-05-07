import {Request, Response} from "express";
import { LoginData, UserRegisterDataDocument } from "../../middlewares/types/User";
import UserService from "../../services/UserService";

const UserRegister =async (req:Request,res:Response)=>{
    const service = new UserService()
    const {message,error,status} = await service.exist_or_create<LoginData,UserRegisterDataDocument>({email:req.body.email},req.body)
    return res.status(status).json({error,message})
}
export default UserRegister