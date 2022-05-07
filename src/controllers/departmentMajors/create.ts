import { Request, Response } from "express";
import { DepartmentMajorsData } from "../../middlewares/types/DepartmentMajor";
import DepartmentMajorsService from "../../services/DepartmentMajors";

const departmentMajorsCreate = async (req:Request,res:Response) => {
    const service = new DepartmentMajorsService()
    const {data,error,message,status} = await service.exist_sameData_or_create<DepartmentMajorsData>(req.body)
    return res.status(status).json({error,message,data})
}
export default departmentMajorsCreate;