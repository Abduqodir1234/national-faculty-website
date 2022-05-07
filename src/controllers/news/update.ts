import { Response } from "express";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import NewsService from "../../services/NewsService";

const newsUpdate = async (req:RequestWithUser,res:Response) => {
    const service = new NewsService()
    const id = req.params.id
    const {data,error,message,status} = await service.updatebyId(id,req.body2?.body)
    return res.status(status).json({error,message,data})
}
export default newsUpdate