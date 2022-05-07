import {Request, Response} from "express";
import TeacherService from "../../services/TeacherService";

const teacherCreate = async (req:Request,res:Response)=>{
    const service = new TeacherService()
    const {error,message,status} = await service.createElement(req.body)
    return res.status(status).json({error,message})
}
export default teacherCreate