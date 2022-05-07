import { Request, Response } from "express";
import DepartmentSubjectService from "../../services/DepartmentSubjectService";

const departmentSubjectList = async (req:Request,res:Response) => {
    const service = new DepartmentSubjectService()
    const {data,error,message,status} = await service.list(req)
    return res.status(status).json({error,message,data})
}
export default departmentSubjectList;