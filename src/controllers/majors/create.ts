import { Response } from "express";
import { MajorData } from "../../middlewares/types/Major";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import MajorsService from "../../services/MajorsService";

const majorCreate = async (req:RequestWithUser,res:Response) => {
    const service = new MajorsService()
    const {data,error,message,status} = await service.exist_sameData_or_create<MajorData>(req.body2?.body)
    return res.status(status).json({error,message,data})
}
export default majorCreate;