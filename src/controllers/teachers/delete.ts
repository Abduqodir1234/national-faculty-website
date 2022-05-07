import {Request, Response} from "express";
import TeacherService from "../../services/TeacherService";
import {Document} from "mongoose";

const teacherDeleteById = async (req:Request,res:Response) => {
    const service = new TeacherService()
    const {id} = req.params as unknown as {id:Document["_id"]}
    const {error,message,status} = await service.deleteById(id)
    return res.status(status).json({error,message})
}
export default teacherDeleteById;