import { Request, Response } from "express";
import SubjectService from "../../services/SubjectService";

const subjectDelete = async (req:Request,res:Response) => {
    const service = new SubjectService()
    const id = req.params.id
    const {data,error,message,status} = await service.deleteById(id)
    return res.status(status).json({data,error,message})
}
export default subjectDelete;