import { Request, Response } from "express";
import MajorsService from "../../services/MajorsService";

const majorsList = async (req:Request,res:Response) => {
    const service =  new MajorsService()
    const {data,error,message,status} = await service.list(req)
    return res.status(status).json({error,message,data})
}
export default majorsList;