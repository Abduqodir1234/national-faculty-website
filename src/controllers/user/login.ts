import {Request,Response} from "express";
import UserService from "../../services/UserService";

const Login = async (req:Request,res:Response) =>{
    const service = new UserService()
    const {error,message,status,data} = await service.login(req)
    return res.status(status).json({error,message,data})
}
export default Login