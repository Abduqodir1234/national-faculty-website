import {Request, Response} from "express";
import DepartmentService from "../../services/DepartmentService";
import {Document} from "mongoose";
import {Lang} from "../../middlewares/types/LangTypes";

const getDepartmentById = async (req:Request,res:Response) => {
    const {id,lang} = req.params as {id:Document["_id"],lang:Lang["types"]}
    const service = new DepartmentService()
    const {error,status,data,message} = await service.getById(req)
    return res.status(status).json({error,data,message})
}
export default getDepartmentById;