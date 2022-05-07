import { Router } from "express";
import contestCreate from "../../controllers/contest/create";
import contestDelete from "../../controllers/contest/delete";
import contestGet from "../../controllers/contest/get";
import contestList from "../../controllers/contest/list";
import contestUpdate from "../../controllers/contest/update";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import { contestSchemaValidation } from "../../middlewares/joi/contest/schema";
import contestUpdateValidation from "../../middlewares/joi/contest/update";
import verifyToken from "../../middlewares/verifyToken";

const contestRoutes = Router()


contestRoutes.route("/:lang")
    .post(verifyToken,PhotoCheck,contestSchemaValidation,contestCreate)
    .get(contestList)

contestRoutes.route("/:id/:lang")
    .get(contestGet)
    .delete(verifyToken,contestDelete)
    .patch(verifyToken,PhotoCheck,contestUpdateValidation,contestUpdate)

export default contestRoutes;