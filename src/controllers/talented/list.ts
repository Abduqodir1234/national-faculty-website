import { Request, Response } from "express"
import TalentedStudentsService from "../../services/StudentService"

const talentedStudentList = async (req:Request,res:Response) => {
    const service = new TalentedStudentsService()
    const {data,error,message,status} = await service.list(req)
    return res.status(status).json({error,message,data})
}
export default talentedStudentList