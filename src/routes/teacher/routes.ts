import {Request, Response, Router} from "express";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import teacherCreateValidation from "../../middlewares/joi/teachers/create";
import {teacherUpdateValidation} from "../../middlewares/joi/teachers/update";
import verifyToken from "../../middlewares/verifyToken";
import TeachersController from "../../controllers/teachers";

const teacherRoutes = Router()
const controller = new TeachersController()

teacherRoutes.route("/")
    .post(
        verifyToken,
        PhotoCheck,
        teacherCreateValidation,
        (req:Request,res:Response) => controller.create(req,res)
    )
    .get(
        (req:Request,res:Response) => controller.list(req,res)
    )

teacherRoutes.route("/:id")
    .patch(
        verifyToken,
        PhotoCheck,
        teacherUpdateValidation,
        (req:Request,res:Response) => controller.update(req,res)
    )
    .get(
        (req:Request,res:Response) => controller.get(req,res)
    )
    .delete(
        verifyToken,
        (req:Request,res:Response) => controller.delete(req,res)
    )

export default teacherRoutes;
