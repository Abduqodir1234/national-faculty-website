import { Request, Response, Router } from "express";
import TalentController from "../../controllers/talented";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import { talentedSchemaValidation } from "../../middlewares/joi/talented/schema";
import { talentedUpdateSchemaValidation } from "../../middlewares/joi/talented/update";
import langChecker from "../../middlewares/langChecker";
import verifyToken from "../../middlewares/verifyToken";

const studentRoutes = Router()
const controllers = new TalentController()

studentRoutes.route("/:lang")
    .post(
        langChecker,
        verifyToken,
        PhotoCheck,
        talentedSchemaValidation,
        (req:Request,res:Response) => controllers.create(req,res)
    )
    .get(
        langChecker,
        (req:Request,res:Response) => controllers.list(req,res)
    )
studentRoutes.route("/:id/:lang")
    .patch(
        langChecker,
        verifyToken,
        PhotoCheck,
        talentedUpdateSchemaValidation,
        (req:Request,res:Response) => controllers.update(req,res)
    )
    .get(
        langChecker,
        (req:Request,res:Response) => controllers.get(req,res)
    )
    .delete(
        langChecker,
        verifyToken,
        (req:Request,res:Response) => controllers.delete(req,res)
    )

export default studentRoutes;