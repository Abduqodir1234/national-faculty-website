import { Request, Response } from "express"
import TalentedStudentsService from "../../services/StudentService"

const talentedStudentDelete = async (req:Request,res:Response) => {
    const service = new TalentedStudentsService()
    const {data,error,message,status} = await service.deleteById(req.params.id)
    return res.status(status).json({error,message,data})
}
export default talentedStudentDelete;