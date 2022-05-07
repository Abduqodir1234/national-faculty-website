import { Response } from "express";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import MainInfosService from "../../services/MainInfosService";

const mainInfosUpdate = async (req:RequestWithUser,res:Response) => {
    const service = new MainInfosService()
    const {data,error,message,status} = await service.updateOneData(req)
    return res.status(status).json({error,message,data})
}
export default mainInfosUpdate;