import { Request, Response } from "express";
import { AdminstrationDocument } from "../middlewares/types/Adminstration";
import { ContestData } from "../middlewares/types/Contest";
import { RequestWithUser } from "../middlewares/types/RequestWithUser";
import ContestService from "../services/ContestService";
import BaseController from "./BaseController";

class ContestController extends BaseController{
    private service = new ContestService()

    constructor(){
        super(new ContestService())
    }

    async create(req:RequestWithUser,res:Response){
        const {data,error,message,status} = await this.service.createElement<ContestData>(req.body2?.body)
        return res.status(status).json({error,message,data})
    }

    async update(req:Request,res:Response){
        const {data,error,message,status} = await this.service.updatebyId<AdminstrationDocument>(req.params.id,req.body)
        return res.status(status).json({error,message,data})
    }
    
}

export default ContestController;