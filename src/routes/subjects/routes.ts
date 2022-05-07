import { Router } from "express";
import subjectCreate from "../../controllers/subjects/create";
import subjectDelete from "../../controllers/subjects/delete";
import subjectGetByid from "../../controllers/subjects/get";
import subjectList from "../../controllers/subjects/list";
import subjectUpdate from "../../controllers/subjects/update";
import subjectSchema from "../../middlewares/joi/subjects/validator";
import verifyToken from "../../middlewares/verifyToken";

const subjectRoutes = Router()


subjectRoutes.route("/:lang")
    .post(verifyToken,subjectSchema,subjectCreate)
    .get(subjectList)

subjectRoutes.route("/:id/:lang")
    .patch(verifyToken,subjectSchema,subjectUpdate)
    .delete(verifyToken,subjectDelete)
    .get(subjectGetByid)
 
export default subjectRoutes;