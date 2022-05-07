import {Request,Response} from "express"
import DepartmentService from "../../services/DepartmentService"
const departmentDelete = async (req:Request,res:Response) => {
    const service = new DepartmentService()
    const {data,error,message,status} = await service.deleteById(req.params.id)
    return res.status(status).json({data,error,message,status})
}
export default departmentDelete;