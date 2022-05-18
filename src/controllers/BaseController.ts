import { Request, Response } from "express";

class BaseController{
    private baseService:any;
    constructor(service:any){
        this.baseService=service
    }

    async list(req:Request,res:Response){
        const {data,error,message,status} = await this.baseService.list(req)
        return res.status(status).json({error,message,data})
    }

    async delete(req:Request,res:Response){
        const {data,error,message,status} = await this.baseService.deleteById(req.params.id)
        return res.status(status).json({error,message,data})
    }

    async get(req:Request,res:Response){
        const {error,status,data,message} = await this.baseService.getById(req)
        return res.status(status).json({error,message,data})
    }
}
export default BaseController;