import { Response } from "express";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import SubjectService from "../../services/SubjectService";

const subjectCreate = async (req:RequestWithUser,res:Response) => {
    const service = new SubjectService()
    const {data,error,message,status} = await service.exist_sameData_or_create<{name:string}>(req.body2?.body)
    return res.status(status).json({error,message,data})
}
export default subjectCreate