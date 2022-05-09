import { Request, Response } from "express";
import { DepartmentSubjectCreate } from "../middlewares/types/DepartmentSubject";
import DepartmentSubjectService from "../services/DepartmentSubjectService";
import BaseController from "./BaseController";

class DepartmentSubjectController extends BaseController{
    private service = new DepartmentSubjectService()

    constructor(){
        super(new DepartmentSubjectService())
    }

    async create(req:Request,res:Response){
        const {data,error,message,status} = await this.service
            .exist_sameData_or_create<DepartmentSubjectCreate>(req.body)
        return res.status(status).json({error,data,message})
    }

    async update(req:Request,res:Response){
        const {data,error,message,status} = await this.service
            .updatebyId<DepartmentSubjectCreate>(req.params.id,req.body)
        return res.status(status).json({error,data,message})
    }
}

export default DepartmentSubjectController;