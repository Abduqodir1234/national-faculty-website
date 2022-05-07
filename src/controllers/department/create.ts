import {Response} from "express";
import DepartmentService from "../../services/DepartmentService";
import {RequestWithUser} from "../../middlewares/types/RequestWithUser";
import { DepartmentsDocument } from "../../models/deparments";
import { DepartmentSubjectNameTypes } from "../../middlewares/types/DepartmentSubject";
import { Lang } from "../../middlewares/types/LangTypes";


const departmentCreate = async (req:RequestWithUser,res:Response) => {
    const service = new DepartmentService()
    const lang = req.params.lang as Lang["types"]
    const {error,status,message} = await service
        .exist_or_create<DepartmentSubjectNameTypes,DepartmentsDocument>({[`name_${lang}`]:req?.body.name},req?.body2?.body) 
    return res.status(status).json({error,message})
}
export default departmentCreate;