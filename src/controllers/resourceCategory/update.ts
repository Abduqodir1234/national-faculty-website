import { Response } from "express";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import ResourceCategoryService from "../../services/ResourceCategoryService";

const resourceCategoryUpdate = async (req:RequestWithUser,res:Response) => {
    const service = new ResourceCategoryService()
    const {data,error,message,status} = await service.updatebyId(req.params.id,req.body2?.body)
    return res.status(status).json({error,message,data})
}
export default resourceCategoryUpdate;