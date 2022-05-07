import {Request, Response} from "express";
import TeacherService from "../../services/TeacherService";
import {teacherListLimit} from "../../config";

const teachersList =async (req:Request,res:Response) => {
    const service = new TeacherService()
    const {page} = req.query as unknown as  {page:number}
    const {error,message,status,data} = await service.list(page || 1,teacherListLimit)
    if(error) return res.status(status).json({error,message})
    return res.status(status).json({error,data})

}
export default teachersList;