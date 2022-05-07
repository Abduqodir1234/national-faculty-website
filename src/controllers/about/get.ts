import { Request, Response } from "express";
import AboutService from "../../services/AboutService";

const aboutGet = async (req:Request,res:Response) => {
    const service = new AboutService()
    const {data,error,message,status} = await service.get(req)
    return res.status(status).json({error,message,data})
}
export default aboutGet;