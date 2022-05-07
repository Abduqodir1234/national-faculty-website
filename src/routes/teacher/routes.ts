import {Router} from "express";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import teacherCreateValidation from "../../middlewares/joi/teachers/create";
import teacherCreate from "../../controllers/teachers/create";
import teachersList from "../../controllers/teachers/list";
import {teacherUpdateValidation} from "../../middlewares/joi/teachers/update";
import teacherUpdateById from "../../controllers/teachers/update";
import teacherGetById from "../../controllers/teachers/get";
import teacherDeleteById from "../../controllers/teachers/delete";
import verifyToken from "../../middlewares/verifyToken";

const teacherRoutes = Router()

teacherRoutes.route("/")
    .post(verifyToken,PhotoCheck,teacherCreateValidation,teacherCreate)
    .get(teachersList)

teacherRoutes.route("/:id")
    .patch(verifyToken,PhotoCheck,teacherUpdateValidation,teacherUpdateById)
    .get(teacherGetById)
    .delete(verifyToken,teacherDeleteById)

export default teacherRoutes;
