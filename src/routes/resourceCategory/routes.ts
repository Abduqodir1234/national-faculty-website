import { Response, Router } from "express";
import ResourceCategoryController from "../../controllers/resource.category";
import resourceCategoryValidation from "../../middlewares/joi/resourceCategory/schema";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import verifyToken from "../../middlewares/verifyToken";

const resourceCategoryRoutes = Router()
const controller = new ResourceCategoryController()

resourceCategoryRoutes.route("/:lang")
    .post(
        verifyToken,
        resourceCategoryValidation,
        (req:RequestWithUser,res:Response) => controller.create(req,res)
    )
    .get(
        (req:RequestWithUser,res:Response) => controller.list(req,res)
    )


resourceCategoryRoutes.route("/:id/:lang")
    .get(
        (req:RequestWithUser,res:Response) => controller.get(req,res)
    )
    .patch(
        verifyToken,
        resourceCategoryValidation,
        (req:RequestWithUser,res:Response) => controller.update(req,res)
    )
    .delete(
        verifyToken,
        (req:RequestWithUser,res:Response) => controller.delete(req,res)
    )
export default resourceCategoryRoutes;