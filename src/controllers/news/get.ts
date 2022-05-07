import { Request, Response } from "express";
import NewsService from "../../services/NewsService";

const newsGetById = async (req:Request,res:Response) => {
    const service = new NewsService()
    const {data,error,message,status} = await service.getById(req)
    return res.status(status).json({error,message,data})
}
export default newsGetById;