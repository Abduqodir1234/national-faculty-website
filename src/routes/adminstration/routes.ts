import { Response, Router,Request } from "express";
import AdminstrationController from "../../controllers/adminstration";
import adminstrationsValidation from "../../middlewares/joi/adminstration/schema";
import verifyToken from "../../middlewares/verifyToken";

const adminstrationRoutes = Router()
const controller = new AdminstrationController()

adminstrationRoutes.route('/:lang')
    .post(
        verifyToken,
        adminstrationsValidation,
        (req:Request,res:Response)=>controller.create(req,res)
    )
    .get(
        (req:Request,res:Response) => controller.list(req,res)
    )


adminstrationRoutes.route('/:id/:lang')
    .patch(
        verifyToken,
        adminstrationsValidation,
        (req:Request,res:Response) => controller.update(req,res)
    )
    .delete(
        verifyToken,
        (req:Request,res:Response) => controller.delete(req,res)
    )
    .get(
        (req:Request,res:Response) => controller.get(req,res)
    )

export default adminstrationRoutes;