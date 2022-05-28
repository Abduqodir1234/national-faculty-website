import { Request, Response,Router } from "express";
import AboutController from "../../controllers/about";
import aboutSchemaValidation from "../../middlewares/joi/about/schema";
import langChecker from "../../middlewares/langChecker";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import verifyToken from "../../middlewares/verifyToken";

const aboutRoutes = Router()

const controller = new AboutController()

aboutRoutes.route("/:lang")
    .post(
        langChecker,
        verifyToken,
        aboutSchemaValidation,
        (req:RequestWithUser,res:Response) => controller.create(req,res)
    )
    .patch(
        langChecker,
        verifyToken,
        aboutSchemaValidation,
        (req:RequestWithUser,res:Response) => controller.update(req,res)
    )
    .get(
        langChecker,
        (req:Request,res:Response) => controller.get(req,res)
    )

export default aboutRoutes;