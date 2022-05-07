import { Request, Response } from "express";
import TalentedStudentsService from "../../services/StudentService";

const talentedStudentsCreate = async (req:Request,res:Response) => {
    const service = new TalentedStudentsService()
    const {data,error,message,status} = await service.createElement(req.body)
    return res.status(status).json({error,message,data})
}
export default talentedStudentsCreate;