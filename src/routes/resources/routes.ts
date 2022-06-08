import { Request, Response, Router } from "express";
import ResourceController from "../../controllers/resources";
import { uploadFile } from "../../middlewares/fileUpload";
import resourcesSchemaValidation from "../../middlewares/joi/resources/schema";
import resourcesUpdateSchemaValidation from "../../middlewares/joi/resources/update";
import langChecker from "../../middlewares/langChecker";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import verifyToken from "../../middlewares/verifyToken";

const resourcesRoutes = Router()
const controller = new ResourceController()
resourcesRoutes.route("/:lang")
    .post(
        langChecker,
        verifyToken,
        uploadFile.single("file"),
        resourcesSchemaValidation,
        (req:RequestWithUser,res:Response) => controller.create(req,res)
    )
    .get(
        langChecker,
        (req:Request,res:Response) => controller.list(req,res)
    )


resourcesRoutes.route("/:id/:lang")
    .get(
        langChecker,
        (req:Request,res:Response) => controller.get(req,res)
    )
    .patch(
        langChecker,
        verifyToken,
        resourcesUpdateSchemaValidation,
        (req:RequestWithUser,res:Response) => controller.update(req,res)
    )
    .delete(
        langChecker,
        verifyToken,
        (req:RequestWithUser,res:Response) => controller.delete(req,res)
    )

export default resourcesRoutes;