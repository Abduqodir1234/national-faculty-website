import { Request, Response } from "express";
import DepartmentMajorsService from "../../services/DepartmentMajors";

const departmentMajorsDelete = async (req:Request,res:Response) => {
    const service = new DepartmentMajorsService()
    const {data,error,message,status} = await service.deleteById(req.params.id)
    return res.status(status).json({error,message,data})
}
export default departmentMajorsDelete;