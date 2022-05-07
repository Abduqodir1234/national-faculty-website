import { Request, Response } from "express";
import ResourceCategoryService from "../../services/ResourceCategoryService";

const resourceCategoryDelete = async (req:Request,res:Response) => {
    const service = new ResourceCategoryService()
    const {data,error,message,status} = await service.deleteById(req.params.id)
    return res.status(status).json({error,message,data})
}
export default resourceCategoryDelete;