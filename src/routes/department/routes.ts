import {Request, Response, Router} from "express";
import verifyToken from "../../middlewares/verifyToken";
import departmentCreateValidation from "../../middlewares/joi/department/create";
import departmentUpdateValidation from "../../middlewares/joi/department/update";
import DepartmentController from "../../controllers/department";
import langChecker from "../../middlewares/langChecker";

const departmentRoutes = Router()
const controller = new DepartmentController()

departmentRoutes.route("/:lang")
    .post(
        langChecker,
        verifyToken,
        departmentCreateValidation,
        (req:Request,res:Response)=>controller.create(req,res)
    )
    .get(
        langChecker,
        (req:Request,res:Response)=>controller.list(req,res)
    )

departmentRoutes.route("/:id/:lang")
    .get(
        langChecker,
        (req:Request,res:Response)=>controller.get(req,res)
    )
    .patch(
        langChecker,
        verifyToken,
        departmentUpdateValidation,
        (req:Request,res:Response)=>controller.update(req,res)
    )
    .delete(
        langChecker,
        verifyToken,
        (req:Request,res:Response)=>controller.delete(req,res)
    )

export default departmentRoutes