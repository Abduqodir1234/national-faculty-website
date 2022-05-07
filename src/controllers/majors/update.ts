import { Request, Response } from "express";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import MajorsService from "../../services/MajorsService";

const majorsUpdate = async (req:RequestWithUser,res:Response) => {
    const service = new MajorsService()
    const {data,error,message,status} = await service.updatebyId(req.params.id,req.body2?.body)
    return res.status(status).json({error,message,data})
}
export default majorsUpdate;