import { Request, Response } from "express"
import DepartmentSubjectService from "../../services/DepartmentSubjectService"


const departmentSubjectGetByid = async (req:Request,res:Response) => {
    const service = new DepartmentSubjectService()
    const {error,status,data,message} = await service.getByid(req)
    return res.status(status).json({error,data,message})
}
export default departmentSubjectGetByid;