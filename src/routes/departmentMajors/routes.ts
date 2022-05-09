import { Request, Response, Router } from "express";
import DepartmentMajorController from "../../controllers/department.majors";
import departmentMajorsCreateValidation from "../../middlewares/joi/departmentMajors/create";
import departmentMajorsUpdateValidation from "../../middlewares/joi/departmentMajors/update";
import verifyToken from "../../middlewares/verifyToken";

const departmentMajorsRoutes = Router()

const controller = new DepartmentMajorController()

departmentMajorsRoutes.route("/:lang")
    .post(
        verifyToken,
        departmentMajorsCreateValidation,
        (req:Request,res:Response) => controller.create(req,res)
    )
    .get(
        (req:Request,res:Response) => controller.list(req,res)
    )

departmentMajorsRoutes.route("/:id/:lang")
    .get(
        (req:Request,res:Response) => controller.get(req,res)
    )
    .delete(
        verifyToken,
        (req:Request,res:Response) => controller.delete(req,res)
    )
    .patch(
        verifyToken,
        departmentMajorsUpdateValidation,
        (req:Request,res:Response) => controller.update(req,res)
    )

export default departmentMajorsRoutes;