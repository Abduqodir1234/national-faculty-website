import { Response } from "express";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import MainInfosService from "../../services/MainInfosService";

const mainInfosCreate = async (req:RequestWithUser,res:Response) =>{
    const service = new MainInfosService()
    const {data,error,message,status} = await service.createOnlyOneData(req.body2?.body)
    return res.status(status).json({error,message,data})
}
export default mainInfosCreate;