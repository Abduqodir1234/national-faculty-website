import { Request, Response } from "express";
import ContestService from "../../services/ContestService";

const contestDelete = async (req:Request,res:Response) => {
    const service = new ContestService()
    const {data,error,message,status} = await service.deleteById(req.params.id)
    return res.status(status).json({error,message,data})
}
export default contestDelete;