import { Request, Response } from "express";
import MajorsService from "../../services/MajorsService";

const majorsDelete = async (req:Request,res:Response) => {
    const service = new MajorsService()
    const {data,error,message,status} = await service.deleteById(req.params.id)
    return res.status(status).json({error,message,data})
}
export default majorsDelete;