import {Response,Request} from "express"
import DepartmentService from "../../services/DepartmentService"
const departmentList = async (req:Request,res:Response) => {
    const service = new DepartmentService()
    const {data,error,message,status} = await service.list(req)
    return res.status(status).json({error,message,data})
}
export default departmentList