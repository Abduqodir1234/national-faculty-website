import { Request, Response } from "express";
import SubjectService from "../../services/SubjectService";

const subjectList = async (req:Request,res:Response) => {
    const service = new SubjectService()
    const {data,error,message,status} = await service.getAll(req)
    return res.status(status).json({error,message,data})
}
export default subjectList