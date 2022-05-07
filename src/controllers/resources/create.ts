import { Response } from "express";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import ResourcesService from "../../services/ResourcesService";


const resourceCreate = async (req:RequestWithUser,res:Response) => {
    const service = new ResourcesService()
    const {data,error,message,status} = await service.createElement(req.body2?.body)
    return res.status(status).json({error,message,data})
}
export default resourceCreate;