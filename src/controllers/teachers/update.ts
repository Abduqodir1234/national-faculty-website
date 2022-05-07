import {Request, Response} from "express";
import TeacherService from "../../services/TeacherService";
import {TeacherDocument} from "../../models/teacher";

const teacherUpdateById = async (req:Request,res:Response) => {
    const service = new TeacherService()
    const {id} = req.params as unknown as {id:TeacherDocument["_id"]}
    const {error,message,status} = await service.updatebyId(id,req.body)
    return res.status(status).json({error,message})
}

export default teacherUpdateById;