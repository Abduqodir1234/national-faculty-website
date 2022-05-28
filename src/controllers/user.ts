import { Request, Response } from "express";
import { RequestWithUser } from "../middlewares/types/RequestWithUser";
import { LoginData, UserRegisterDataDocument } from "../middlewares/types/User";
import UserService from "../services/UserService";
import BaseController from "./BaseController";

class UserController extends BaseController{
    private service = new UserService()

    constructor(){
        super(new UserService())
    }

    async getUser(req:RequestWithUser,res:Response){
        delete req.user?.__v;
        delete req.user?.role
        return res.status(200).json({error:false,data:req.user})
    }

    async login(req:Request,res:Response){
        const {error,message,status,data} = await this.service.login(req)
        return res.status(status).json({error,message,data})
    }

    async logout (req:RequestWithUser,res:Response){
        const {message,error,status}  = await this.service
            .logout(req?.user?._id)
        return res.status(status).json({error,message})
    }

    async register(req:Request,res:Response){
        const {message,error,status} = await this.service
            .exist_or_create<LoginData,UserRegisterDataDocument>({email:req.body.email},req.body)
        return res.status(status).json({error,message})
    }

    async update(req:RequestWithUser,res:Response){
        console.log(req?.user?._id);
        
        const {error,message,status} = await this.service
            .updatebyId(req?.user?._id,req.body)
        return res.status(status).json({error,message})
    }
}

export default UserController;