import { Router } from "express";
import majorCreate from "../../controllers/majors/create";
import majorsDelete from "../../controllers/majors/delete";
import majorsGet from "../../controllers/majors/get";
import majorsList from "../../controllers/majors/list";
import majorsUpdate from "../../controllers/majors/update";
import majorsSchema from "../../middlewares/joi/major/schema";
import verifyToken from "../../middlewares/verifyToken";

const majorRoutes = Router()

majorRoutes.route("/:lang")
    .post(verifyToken,majorsSchema,majorCreate)
    .get(majorsList)

majorRoutes.route("/:id/:lang")
    .get(majorsGet)
    .delete(verifyToken,majorsDelete)
    .patch(verifyToken,majorsSchema,majorsUpdate)
export default majorRoutes;