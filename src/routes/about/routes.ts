import { Request, Response,Router } from "express";
import AboutController from "../../controllers/about";
import aboutSchemaValidation from "../../middlewares/joi/about/schema";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import verifyToken from "../../middlewares/verifyToken";

const aboutRoutes = Router()

const controller = new AboutController()

aboutRoutes.route("/:lang")
    .post(
        verifyToken,
        aboutSchemaValidation,
        (req:RequestWithUser,res:Response) => controller.create(req,res)
    )
    .patch(
        verifyToken,
        aboutSchemaValidation,
        (req:RequestWithUser,res:Response) => controller.update(req,res)
    )
    .get(
        (req:Request,res:Response) => controller.get(req,res)
    )

export default aboutRoutes;