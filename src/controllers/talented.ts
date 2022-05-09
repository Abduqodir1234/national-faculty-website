import { Request, Response } from "express";
import TalentedStudentsService from "../services/StudentService";
import BaseController from "./BaseController";

class TalentController extends BaseController{
    private service = new TalentedStudentsService()

    constructor(){
        super(new TalentedStudentsService())
    }

    async create(req:Request,res:Response){
        const {data,error,message,status} = await this.service
            .createElement(req.body)
        return res.status(status).json({error,message,data})
    }

    async update(req:Request,res:Response){
        const {data,error,message,status} = await this.service
            .updatebyId(req.params.id,req.body)
        return res.status(status).json({error,message,data})
    }
}

export default TalentController;