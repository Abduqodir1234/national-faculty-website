import { Request, Response } from "express";
import NewsService from "../../services/NewsService";

const newsDelete = async (req:Request,res:Response) => {
    const service = new NewsService()
    const id = req.params.id
    const {data,error,message,status} = await service.deleteById(id)
    return res.status(status).json({error,message,data})
}
export default newsDelete;