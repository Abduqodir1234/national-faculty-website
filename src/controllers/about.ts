import { Request, RequestHandler, Response } from "express";
import { AboutData } from "../middlewares/types/About";
import { RequestWithUser } from "../middlewares/types/RequestWithUser";
import AboutService from "../services/AboutService";

class AboutController{
    private service = new AboutService()

    async create(req:RequestWithUser,res:Response){
        const {data,error,message,status} = await this.service.createOnlyOneData<AboutData>(req.body2?.body)
        return res.status(status).json({error,message,data})
    }

    async get(req:Request,res:Response){
        const {data,error,message,status} = await this.service.get(req)
        return res.status(status).json({error,message,data})
    }

    async update (req:RequestWithUser,res:Response){
        const {data,error,message,status} = await this.service.updateFirstElement(req)
        return res.status(status).json({error,message,data})
    } 
}
export default AboutController;