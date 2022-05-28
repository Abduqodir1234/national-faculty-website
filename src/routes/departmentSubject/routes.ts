import { Request, Response, Router } from "express";
import DepartmentSubjectController from "../../controllers/department.subject";
import departmentSubjectValidation from "../../middlewares/joi/departmentSubject/create";
import langChecker from "../../middlewares/langChecker";
import verifyToken from "../../middlewares/verifyToken";

const departmentSubjectRoutes = Router()
const controller = new DepartmentSubjectController()

departmentSubjectRoutes.route("/:lang")
    .post(
        langChecker,
        verifyToken,
        departmentSubjectValidation,
        (req:Request,res:Response) => controller.create(req,res)
    )
    .get(
        langChecker,
        (req:Request,res:Response) => controller.list(req,res)
    )

departmentSubjectRoutes.route("/:id/:lang")
    .patch(
        langChecker,
        verifyToken,
        departmentSubjectValidation,
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
export default departmentSubjectRoutes