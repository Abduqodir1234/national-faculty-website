import { Response } from "express";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import AboutService from "../../services/AboutService";

const aboutUpdate = async (req:RequestWithUser,res:Response) => {
    const service = new AboutService()
    const {data,error,message,status} = await service.updateFirstElement(req)
    return res.status(status).json({error,message,data})
}
export default aboutUpdate;