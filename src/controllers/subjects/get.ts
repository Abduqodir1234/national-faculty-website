import { Request, Response } from "express";
import SubjectService from "../../services/SubjectService";


const subjectGetByid = async (req:Request,res:Response) => {
    const service = new SubjectService()
    const {error,status,data,message} = await service.getByid(req)
    return res.status(status).json({error,data,message})
}
export default subjectGetByid;