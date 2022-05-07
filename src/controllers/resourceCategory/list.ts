import { Request, Response } from "express";
import ResourceCategoryService from "../../services/ResourceCategoryService";

const resourceCategoryList = async (req:Request,res:Response) => {
    const service = new ResourceCategoryService()
    const {data,error,message,status} = await service.list(req)
    return res.status(status).json({error,message,data})
}
export default resourceCategoryList;