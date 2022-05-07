import { Response } from "express";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import SubjectService from "../../services/SubjectService";

const subjectUpdate = async (req:RequestWithUser,res:Response) => {
     const service = new SubjectService()
     const {id} = req.params
     const {data,error,message,status} = await service.updatebyId(id,req.body2?.body)
     return res.status(status).json({data,error,message,status})
}

export default subjectUpdate;