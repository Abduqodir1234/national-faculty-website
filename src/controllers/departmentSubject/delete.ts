import { Request, Response } from "express";
import DepartmentSubjectService from "../../services/DepartmentSubjectService";

const departmentSubjectDelete = async (req:Request,res:Response) => {
    const service = new DepartmentSubjectService()
    const id = req.params.id
    const {data,error,message,status} = await service.deleteById(id)
    return res.status(status).json({data,error,message})
}
export default departmentSubjectDelete;