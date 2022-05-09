import { Request, Response, Router } from "express";
import ResourceController from "../../controllers/resources";
import resourcesSchemaValidation from "../../middlewares/joi/resources/schema";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import verifyToken from "../../middlewares/verifyToken";

const resourcesRoutes = Router()
const controller = new ResourceController()
resourcesRoutes.route("/:lang")
    .post(
        verifyToken,
        resourcesSchemaValidation,
        (req:RequestWithUser,res:Response) => controller.create(req,res)
    )
    .get(
        (req:Request,res:Response) => controller.list(req,res)
    )


resourcesRoutes.route("/:id/:lang")
    .get(
        (req:Request,res:Response) => controller.get(req,res)
    )
    .patch(
        verifyToken,
        resourcesSchemaValidation,
        (req:RequestWithUser,res:Response) => controller.update(req,res)
    )
    .delete(
        verifyToken,
        (req:RequestWithUser,res:Response) => controller.delete(req,res)
    )

export default resourcesRoutes;