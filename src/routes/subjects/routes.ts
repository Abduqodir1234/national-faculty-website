import { Request, Response, Router } from "express";
import SubjectController from "../../controllers/subjects";
import subjectSchema from "../../middlewares/joi/subjects/validator";
import langChecker from "../../middlewares/langChecker";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import verifyToken from "../../middlewares/verifyToken";

const subjectRoutes = Router()
const controller = new SubjectController()

subjectRoutes.route("/:lang")
    .post(
        langChecker,
        verifyToken,
        subjectSchema,
        (req:RequestWithUser,res:Response) => controller.create(req,res)
    )
    .get(
        langChecker,
        (req:Request,res:Response) => controller.list(req,res) 
    )

subjectRoutes.route("/:id/:lang")
    .patch(
        langChecker,
        verifyToken,
        subjectSchema,
        (req:RequestWithUser,res:Response) => controller.update(req,res)
    )
    .delete(
        langChecker,
        verifyToken,
        (req:RequestWithUser,res:Response) => controller.delete(req,res)
    )
    .get(
        langChecker,
        (req:Request,res:Response) => controller.get(req,res)
    )
 
export default subjectRoutes;