import { Request, Response } from "express";
import AdminstrationService from "../../services/AdminstrationService";

const adminstrationGetByid = async (req:Request,res:Response) => {
    const service = new AdminstrationService()
    const {data,error,message,status} = await service.getByid(req)
    return res.status(status).json({error,message,data})
}
export default adminstrationGetByid;