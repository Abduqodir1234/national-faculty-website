import { Response, Router } from "express";
import ResourceCategoryController from "../../controllers/resource.category";
import resourceCategoryValidation from "../../middlewares/joi/resourceCategory/schema";
import langChecker from "../../middlewares/langChecker";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import verifyToken from "../../middlewares/verifyToken";

const resourceCategoryRoutes = Router()
const controller = new ResourceCategoryController()

resourceCategoryRoutes.route("/:lang")
    .post(
        langChecker,
        verifyToken,
        resourceCategoryValidation,
        (req:RequestWithUser,res:Response) => controller.create(req,res)
    )
    .get(
        langChecker,
        (req:RequestWithUser,res:Response) => controller.list(req,res)
    )


resourceCategoryRoutes.route("/:id/:lang")
    .get(
        langChecker,
        (req:RequestWithUser,res:Response) => controller.get(req,res)
    )
    .patch(
        langChecker,
        verifyToken,
        resourceCategoryValidation,
        (req:RequestWithUser,res:Response) => controller.update(req,res)
    )
    .delete(
        langChecker,
        verifyToken,
        (req:RequestWithUser,res:Response) => controller.delete(req,res)
    )
export default resourceCategoryRoutes;