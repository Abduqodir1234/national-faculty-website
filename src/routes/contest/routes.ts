import { Request, Response, Router } from "express";
import ContestController from "../../controllers/contest";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import { contestSchemaValidation } from "../../middlewares/joi/contest/schema";
import contestUpdateValidation from "../../middlewares/joi/contest/update";
import verifyToken from "../../middlewares/verifyToken";

const contestRoutes = Router()
const controller = new ContestController()

contestRoutes.route("/:lang")
    .post(
        verifyToken,
        PhotoCheck,
        contestSchemaValidation,
        (req:Request,res:Response) => controller.create(req,res) 
    )
    .get(
        (req:Request,res:Response) => controller.list(req,res)
    )

contestRoutes.route("/:id/:lang")
    .get(
        (req:Request,res:Response) => controller.get(req,res)
    )
    .delete(
        verifyToken,
        (req:Request,res:Response) => controller.delete(req,res)
    )
    .patch(
        verifyToken,
        PhotoCheck,
        contestUpdateValidation,
        (req:Request,res:Response) => controller.update(req,res)
    )

export default contestRoutes;