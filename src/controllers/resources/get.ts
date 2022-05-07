import { Request, Response } from "express";
import ResourcesService from "../../services/ResourcesService";

const resourcesGetById = async (req:Request,res:Response) => {
    const service = new ResourcesService()
    const {data,error,message,status} = await service.getById(req)
    return res.status(status).json({error,message,data})
}
export default resourcesGetById;