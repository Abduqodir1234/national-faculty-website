import { Request, Response } from "express";
import ContestService from "../../services/ContestService";

const contestList = async (req:Request,res:Response) => {
    const service = new ContestService()
    const {data,error,message,status} = await service.list(req)
    return res.status(status).json({error,message,data})
}
export default contestList;