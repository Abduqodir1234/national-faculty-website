import { Request, Response } from "express";
import { RequestWithUser } from "../middlewares/types/RequestWithUser";
import ResourceCategoryService from "../services/ResourceCategoryService";
import BaseController from "./BaseController";

class ResourceCategoryController extends BaseController{
    private service = new ResourceCategoryService()

    constructor(){
        super(new ResourceCategoryService())
    }

    async create(req:RequestWithUser,res:Response){
        const {data,error,message,status} = await this.service.createElement(req.body2?.body)
        return res.status(status).json({error,message,data})
    }

    async update(req:RequestWithUser,res:Response){
        const {data,error,message,status} = await this.service.updatebyId(req.params.id,req.body2?.body)
        return res.status(status).json({error,message,data})
    }

}

export default ResourceCategoryController;