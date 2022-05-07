import { Request, Response } from "express";
import { DepartmentMajorsData } from "../../middlewares/types/DepartmentMajor";
import DepartmentMajorsService from "../../services/DepartmentMajors";

const departmentMajorsUpdate = async (req:Request,res:Response) => {
    const service = new DepartmentMajorsService()
    const {data,error,message,status} = await service.updatebyId<DepartmentMajorsData>(req.params.id,req.body)
    return res.status(status).json({error,message,data})
}
export default departmentMajorsUpdate;