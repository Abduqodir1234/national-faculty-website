import { Response } from "express";
import { RequestWithUser } from "../middlewares/types/RequestWithUser";
import SubjectService from "../services/SubjectService";
import BaseController from "./BaseController";

class SubjectController extends BaseController{
    private service = new SubjectService()

    constructor(){
        super(new SubjectService())
    }

    async create(req:RequestWithUser,res:Response){
        const {data,error,message,status} = await this.service
            .exist_sameData_or_create<{name:string}>(req.body2?.body)
        return res.status(status).json({error,message,data})
    }

    async update(req:RequestWithUser,res:Response){
        const {data,error,message,status} = await this.service
            .updatebyId(req.params.id,req.body2?.body)
        return res.status(status).json({data,error,message,status})
    }

} 

export default SubjectController;