import { Request, Response } from "express";
import NewsService from "../../services/NewsService";

const newsList = async (req:Request,res:Response) => {
    const service = new NewsService()
    const {data,error,message,status} = await service.list(req)
    return res.status(status).json({error,message,data})
}
export default newsList