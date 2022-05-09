import { Response } from "express";
import { MajorData } from "../middlewares/types/Major";
import { RequestWithUser } from "../middlewares/types/RequestWithUser";
import MajorsService from "../services/MajorsService";
import BaseController from "./BaseController";

class MajorController extends BaseController{
    private service = new MajorsService()

    constructor(){
        super(new MajorsService())
    }

    async create(req:RequestWithUser,res:Response){
        const {data,error,message,status} = await this.service.exist_sameData_or_create<MajorData>(req.body2?.body)
        return res.status(status).json({error,message,data})
    }

    async update(req:RequestWithUser,res:Response){
        const {data,error,message,status} = await this.service.updatebyId(req.params.id,req.body2?.body)
        return res.status(status).json({error,message,data})
    }
}
export default MajorController;