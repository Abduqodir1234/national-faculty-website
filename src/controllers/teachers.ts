import { Request, Response } from "express";
import TeacherService from "../services/TeacherService";
import BaseController from "./BaseController";

class TeachersController extends BaseController{
    private service = new TeacherService()

    constructor(){
        super(new TeacherService())
    }

    async create(req:Request,res:Response){
        const {error,message,status} = await this.service
            .createElement(req.body)
        return res.status(status).json({error,message})
    }

    async update(req:Request,res:Response){
        const {error,message,status} = await this.service
            .updatebyId(req.params.id,req.body)
        return res.status(status).json({error,message})
    }
}

export default TeachersController;