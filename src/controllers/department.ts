import { Response } from "express"
import { DepartmentSubjectNameTypes } from "../middlewares/types/DepartmentSubject"
import { RequestWithUser } from "../middlewares/types/RequestWithUser"
import { DepartmentsDocument } from "../models/deparments"
import DepartmentService from "../services/DepartmentService"
import BaseController from "./BaseController"
class DepartmentController extends BaseController{
    private service = new DepartmentService()

    constructor(){
        super(new DepartmentService())
    }

    async create(req:RequestWithUser,res:Response){
        const {error,status,message} = await this.service
            .exist_or_create<DepartmentSubjectNameTypes,DepartmentsDocument>({[`name_${req.params.lang}`]:req?.body.name},req?.body2?.body) 
        return res.status(status).json({error,message})
    }

    

    async update(req:RequestWithUser,res:Response){
        const {data,error,message,status} = await this.service
            .updatebyId<DepartmentsDocument>(req.params.id,req?.body2?.body)
        return res.status(status).json({data,error,message})
    }

    
}

export default DepartmentController;