import { Request, Response } from "express";
import MajorsService from "../../services/MajorsService";

const majorsGet = async (req:Request,res:Response) => {
    const service =  new MajorsService()
    const {data,error,message,status} = await service.getById(req)
    return res.status(status).json({error,message,data})
}
export default majorsGet;