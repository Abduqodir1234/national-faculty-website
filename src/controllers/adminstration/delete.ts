import { Request, Response } from "express";
import AdminstrationService from "../../services/AdminstrationService";

const adminstrationDelete = async (req:Request,res:Response) => {
    const service = new AdminstrationService()
    const {data,error,message,status} = await service.deleteById(req.params.id)
    return res.status(status).json({error,message,data})
}
export default adminstrationDelete;