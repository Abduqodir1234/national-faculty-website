import { Request, Response } from "express";
import ResourcesService from "../../services/ResourcesService";

const resourcesDelete = async (req:Request,res:Response) => {
    const service = new ResourcesService()
    const {data,error,message,status} = await service.deleteById(req.params.id)
    return res.status(status).json({error,message,data})
}
export default resourcesDelete;