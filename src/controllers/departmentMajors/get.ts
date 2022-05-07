import { Request, Response } from "express";
import DepartmentMajorsService from "../../services/DepartmentMajors";

const departmentMajorGet = async (req:Request,res:Response) => {
    const service = new DepartmentMajorsService()
    const {data,error,message,status} = await service.getByid(req)
    return res.status(status).json({error,message,data})
}
export default departmentMajorGet;