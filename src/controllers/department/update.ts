import { Response } from "express";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import { DepartmentsDocument } from "../../models/deparments";
import DepartmentService from "../../services/DepartmentService";

const departmentUpdate = async (req:RequestWithUser,res:Response) => {
    const service = new DepartmentService()
    const {data,error,message,status} = await service
        .updatebyId<DepartmentsDocument>(req.params.id,req?.body2?.body)
    return res.status(status).json({data,error,message})
} 
export default departmentUpdate;