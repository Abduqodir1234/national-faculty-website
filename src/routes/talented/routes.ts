import { Request, Response, Router } from "express";
import TalentController from "../../controllers/talented";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import { talentedSchemaValidation } from "../../middlewares/joi/talented/schema";
import verifyToken from "../../middlewares/verifyToken";

const studentRoutes = Router()
const controllers = new TalentController()

studentRoutes.route("/:lang")
    .post(
        verifyToken,
        PhotoCheck,
        talentedSchemaValidation,
        (req:Request,res:Response) => controllers.create(req,res)
    )
    .get(
        (req:Request,res:Response) => controllers.list(req,res)
    )
studentRoutes.route("/:id/:lang")
    .patch(
        verifyToken,
        PhotoCheck,
        talentedSchemaValidation,
        (req:Request,res:Response) => controllers.update(req,res)
    )
    .get(
        (req:Request,res:Response) => controllers.get(req,res)
    )
    .delete(
        verifyToken,
        (req:Request,res:Response) => controllers.delete(req,res)
    )

export default studentRoutes;