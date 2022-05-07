import {Request, Response} from "express";
import TeacherService from "../../services/TeacherService";
import {Document} from "mongoose";

const teacherGetById = async (req:Request,res:Response) => {
    const service = new TeacherService()
    const {id} = req.params as unknown as {id:Document["_id"]}
    const {error,message,status,data} = await service.getById(id)
    if(error) return res.status(status).json({error,message})
    return res.status(status).json({error,data})
}
export default teacherGetById;