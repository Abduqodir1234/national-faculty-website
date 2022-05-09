import { Request, Response, Router } from "express";
import SubjectController from "../../controllers/subjects";
import subjectSchema from "../../middlewares/joi/subjects/validator";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import verifyToken from "../../middlewares/verifyToken";

const subjectRoutes = Router()
const controller = new SubjectController()

subjectRoutes.route("/:lang")
    .post(
        verifyToken,
        subjectSchema,
        (req:RequestWithUser,res:Response) => controller.create(req,res)
    )
    .get(
        (req:Request,res:Response) => controller.list(req,res) 
    )

subjectRoutes.route("/:id/:lang")
    .patch(
        verifyToken,
        subjectSchema,
        (req:RequestWithUser,res:Response) => controller.update(req,res)
    )
    .delete(
        verifyToken,
        (req:RequestWithUser,res:Response) => controller.delete(req,res)
    )
    .get(
        (req:Request,res:Response) => controller.get(req,res)
    )
 
export default subjectRoutes;