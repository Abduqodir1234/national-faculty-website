import { Request, Response } from "express";
import MainInfosService from "../../services/MainInfosService";

const mainInfosGetById = async (req:Request,res:Response) => {
    const service = new MainInfosService()
    const {data,error,message,status} = await service.get(req)
    return res.status(status).json({error,message,data})
}
export default mainInfosGetById;