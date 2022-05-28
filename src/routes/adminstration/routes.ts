import { Response, Router,Request } from "express";
import AdminstrationController from "../../controllers/adminstration";
import adminstrationsValidation from "../../middlewares/joi/adminstration/schema";
import langChecker from "../../middlewares/langChecker";
import verifyToken from "../../middlewares/verifyToken";

const adminstrationRoutes = Router()
const controller = new AdminstrationController()

adminstrationRoutes.route('/:lang')
    .post(
        langChecker,
        verifyToken,
        adminstrationsValidation,
        (req:Request,res:Response)=>controller.create(req,res)
    )
    .get(
        langChecker,
        (req:Request,res:Response) => controller.list(req,res)
    )


adminstrationRoutes.route('/:id/:lang')
    .patch(
        langChecker,
        verifyToken,
        adminstrationsValidation,
        (req:Request,res:Response) => controller.update(req,res)
    )
    .delete(
        langChecker,
        verifyToken,
        (req:Request,res:Response) => controller.delete(req,res)
    )
    .get(
        langChecker,
        (req:Request,res:Response) => controller.get(req,res)
    )

export default adminstrationRoutes;