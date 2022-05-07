import { Request, Response } from "express";
import { AdminstrationDocument } from "../../middlewares/types/Adminstration";
import AdminstrationService from "../../services/AdminstrationService";

const adminstrationUpdate = async (req:Request,res:Response) => {
    const service = new AdminstrationService()
    const {data,error,message,status} = await service.updatebyId<AdminstrationDocument>(req.params.id,req.body)
    return res.status(status).json({error,message,data})
}
export default adminstrationUpdate;