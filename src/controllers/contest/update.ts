import { Response } from "express";
import { ContestData } from "../../middlewares/types/Contest";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import ContestService from "../../services/ContestService";

const contestUpdate = async (req:RequestWithUser,res:Response) => {
    const service = new ContestService()
    const {data,error,message,status} = await service.updatebyId<ContestData>(req.params.id,req.body2?.body)
    return res.status(status).json({error,message,data})
}
export default contestUpdate;