import { Request, Response } from "express";
import { MainInfosData } from "../middlewares/types/MainInfos";
import { RequestWithUser } from "../middlewares/types/RequestWithUser";
import MainInfosService from "../services/MainInfosService";
import BaseController from "./BaseController";

class MainInfosController extends BaseController{
    private service = new MainInfosService()

    constructor(){
        super(new MainInfosService())
    }

    async create(req:RequestWithUser,res:Response){
        const {data,error,message,status} = await this.service.createOnlyOneData<MainInfosData>(req.body2?.body)
        return res.status(status).json({error,message,data})
    }

    async update(req:RequestWithUser,res:Response){
        const {data,error,message,status} = await this.service.updateOneData(req)
        return res.status(status).json({error,message,data})
    }

    async getmainInfos(req:Request,res:Response){
        const {data,error,message,status} = await this.service.get(req)
        return res.status(status).json({error,message,data})
    }
}

export default MainInfosController;