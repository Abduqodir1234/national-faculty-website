import {Router} from "express";
import verifyToken from "../../middlewares/verifyToken";
import departmentCreateValidation from "../../middlewares/joi/department/create";
import departmentCreate from "../../controllers/department/create";
import getDepartmentById from "../../controllers/department/get";
import departmentList from "../../controllers/department/list";
import departmentUpdate from "../../controllers/department/update";
import departmentUpdateValidation from "../../middlewares/joi/department/update";
import departmentDelete from "../../controllers/department/delete";

const departmentRoutes = Router()

departmentRoutes.route("/:lang")
    .post(verifyToken,departmentCreateValidation,departmentCreate)
    .get(departmentList)

departmentRoutes.route("/:id/:lang")
    .get(getDepartmentById)
    .patch(verifyToken,departmentUpdateValidation,departmentUpdate)
    .delete(verifyToken,departmentDelete)

export default departmentRoutes