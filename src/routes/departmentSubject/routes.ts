import { Router } from "express";
import departmentSubjectCreate from "../../controllers/departmentSubject/create";
import departmentSubjectDelete from "../../controllers/departmentSubject/delete";
import departmentSubjectGetByid from "../../controllers/departmentSubject/get";
import departmentSubjectList from "../../controllers/departmentSubject/list";
import departmentSubjectUpdate from "../../controllers/departmentSubject/update";
import departmentSubjectValidation from "../../middlewares/joi/departmentSubject/create";
import verifyToken from "../../middlewares/verifyToken";

const departmentSubjectRoutes = Router()

departmentSubjectRoutes.route("/:lang")
    .post(verifyToken,departmentSubjectValidation,departmentSubjectCreate)
    .get(departmentSubjectList)

departmentSubjectRoutes.route("/:id/:lang")
    .patch(verifyToken,departmentSubjectValidation,departmentSubjectUpdate)
    .delete(verifyToken,departmentSubjectDelete)
    .get(departmentSubjectGetByid)
export default departmentSubjectRoutes