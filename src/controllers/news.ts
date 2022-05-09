import { Request, Response } from "express";
import { RequestWithUser } from "../middlewares/types/RequestWithUser";
import NewsService from "../services/NewsService";
import BaseController from "./BaseController";

class NewsController extends BaseController{
    private service = new NewsService()

    constructor(){
        super(new NewsService())
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

export default NewsController;