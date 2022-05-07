import { Router } from "express";
import departmentMajorsCreate from "../../controllers/departmentMajors/create";
import departmentMajorsDelete from "../../controllers/departmentMajors/delete";
import departmentMajorGet from "../../controllers/departmentMajors/get";
import departmentMajorsList from "../../controllers/departmentMajors/list";
import departmentMajorsUpdate from "../../controllers/departmentMajors/update";
import departmentMajorsCreateValidation from "../../middlewares/joi/departmentMajors/create";
import departmentMajorsUpdateValidation from "../../middlewares/joi/departmentMajors/update";
import verifyToken from "../../middlewares/verifyToken";

const departmentMajorsRoutes = Router()

departmentMajorsRoutes.route("/:lang")
    .post(verifyToken,departmentMajorsCreateValidation,departmentMajorsCreate)
    .get(departmentMajorsList)

departmentMajorsRoutes.route("/:id/:lang")
    .get(departmentMajorGet)
    .delete(verifyToken,departmentMajorsDelete)
    .patch(verifyToken,departmentMajorsUpdateValidation,departmentMajorsUpdate)

export default departmentMajorsRoutes;