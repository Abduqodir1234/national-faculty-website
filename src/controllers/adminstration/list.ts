import { Request, Response } from "express";
import AdminstrationService from "../../services/AdminstrationService";

const adminstrationList = async (req:Request,res:Response) => {
    const service = new AdminstrationService()
    const {data,error,message,status} = await service.list(req)
    return res.status(status).json({error,message,data})
}
export default adminstrationList;