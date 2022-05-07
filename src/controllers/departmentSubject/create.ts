import { Request, Response } from "express";
import { string } from "joi";
import { DepartmentSubjectCreate } from "../../middlewares/types/DepartmentSubject";
import DepartmentSubjectService from "../../services/DepartmentSubjectService";

const departmentSubjectCreate = async (req:Request,res:Response) => {
    const service = new DepartmentSubjectService()
    const {data,error,message,status} = await service.exist_sameData_or_create<DepartmentSubjectCreate>(req.body)
    return res.status(status).json({error,data,message})
}
export default departmentSubjectCreate;