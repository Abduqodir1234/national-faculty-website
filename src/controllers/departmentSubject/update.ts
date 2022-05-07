import { Request, Response } from "express";
import DepartmentSubjectService from "../../services/DepartmentSubjectService";
import {Document} from "mongoose"
import { DepartmentSubjectCreate } from "../../middlewares/types/DepartmentSubject";

const departmentSubjectUpdate = async (req:Request,res:Response) => {
    const service = new DepartmentSubjectService()
    const id = req.params.id as Document["_id"]
    const {data,error,message,status} = await service.updatebyId<DepartmentSubjectCreate>(id,req.body)
    return res.status(status).json({error,data,message})
}
export default departmentSubjectUpdate;