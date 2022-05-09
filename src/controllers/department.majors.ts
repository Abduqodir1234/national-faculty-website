import { Request, Response } from "express";
import { DepartmentMajorsData } from "../middlewares/types/DepartmentMajor";
import DepartmentMajorsService from "../services/DepartmentMajors";
import BaseController from "./BaseController";

class DepartmentMajorController extends BaseController{
    private service = new DepartmentMajorsService()
    
    constructor(){
        super(new DepartmentMajorsService())
    }

    async create(req:Request,res:Response){
        const {data,error,message,status} = await this.service.exist_sameData_or_create<DepartmentMajorsData>(req.body)
        return res.status(status).json({error,message,data})
    }

    async update(req:Request,res:Response){
        const {data,error,message,status} = await this.service.updatebyId<DepartmentMajorsData>(req.params.id,req.body)
        return res.status(status).json({error,message,data})
    }
}

export default DepartmentMajorController;