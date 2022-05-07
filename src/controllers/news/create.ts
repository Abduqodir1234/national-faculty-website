import { Response } from "express";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import NewsService from "../../services/NewsService";

const newsCreate = async (req:RequestWithUser,res:Response) => {
    const service = new NewsService()
    const {data,error,message,status} = await service.createElement(req.body2?.body)
    return res.status(status).json({error,message})
}
export default newsCreate;