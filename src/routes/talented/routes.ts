import { Router } from "express";
import talentedStudentsCreate from "../../controllers/talented/create";
import talentedStudentDelete from "../../controllers/talented/delete";
import talentedStudentGetById from "../../controllers/talented/get";
import talentedStudentList from "../../controllers/talented/list";
import talentedStudentUpdate from "../../controllers/talented/update";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import { talentedSchemaValidation } from "../../middlewares/joi/talented/schema";
import verifyToken from "../../middlewares/verifyToken";

const studentRoutes = Router()

studentRoutes.route("/:lang")
    .post(verifyToken,PhotoCheck,talentedSchemaValidation,talentedStudentsCreate)
    .get(talentedStudentList)
studentRoutes.route("/:id/:lang")
    .patch(verifyToken,PhotoCheck,talentedSchemaValidation,talentedStudentUpdate)
    .get(talentedStudentGetById)
    .delete(verifyToken,talentedStudentDelete)

export default studentRoutes;