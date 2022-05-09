import { Request, Response } from "express";
import { AdminstrationDocument } from "../middlewares/types/Adminstration";
import AdminstrationService from "../services/AdminstrationService";
import BaseController from "./BaseController";

class AdminstrationController extends BaseController{
    private service = new AdminstrationService()
    constructor(){
        super(new AdminstrationService())
    }

    async create(req:Request,res:Response){
        const {data,error,message,status} = await this.service.createElement<AdminstrationDocument>(req.body)
        return res.status(status).json({error,message,data})
    }

    async update(req:Request,res:Response){
        const {data,error,message,status} = await this.service.updatebyId<AdminstrationDocument>(req.params.id,req.body)
        return res.status(status).json({error,message,data})
    }

}

export default AdminstrationController;