import { Request, Response } from "express"
import TalentedStudentsService from "../../services/StudentService"

const talentedStudentUpdate = async (req:Request,res:Response) => {
    const service = new TalentedStudentsService()
    const {data,error,message,status} = await service.updatebyId(req.params.id,req.body)
    return res.status(status).json({error,message,data})
}
export default talentedStudentUpdate