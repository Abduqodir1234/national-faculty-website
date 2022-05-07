import { Request, Response } from "express";
import { AdminstrationDocument } from "../../middlewares/types/Adminstration";
import AdminstrationService from "../../services/AdminstrationService";

const adminstrationCreate = async (req:Request,res:Response) => {
    const service = new AdminstrationService()
    const {data,error,message,status} = await service.createElement<AdminstrationDocument>(req.body)
    return res.status(status).json({error,message,data})
}
export default adminstrationCreate;