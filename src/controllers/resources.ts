import { Response } from "express";
import { RequestWithUser } from "../middlewares/types/RequestWithUser";
import ResourcesService from "../services/ResourcesService";
import BaseController from "./BaseController";

class ResourceController extends BaseController{
    private service = new ResourcesService()

    constructor(){
        super(new ResourcesService())
    }

    async create(req:RequestWithUser,res:Response){
        const {data,error,message,status} = await this.service
            .createElement(req.body2?.body)
        return res.status(status).json({error,message,data})
    }

    async update(req:RequestWithUser,res:Response){
        const {data,error,message,status} = await this.service
            .updatebyId(req.params.id,req.body2?.body)
        return res.status(status).json({error,message,data})
    }
}

export default ResourceController;