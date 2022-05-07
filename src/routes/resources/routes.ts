import { Router } from "express";
import resourceCreate from "../../controllers/resources/create";
import resourcesDelete from "../../controllers/resources/delete";
import resourcesGetById from "../../controllers/resources/get";
import resourcesList from "../../controllers/resources/list";
import resourcesUpdate from "../../controllers/resources/update";
import resourcesSchemaValidation from "../../middlewares/joi/resources/schema";
import verifyToken from "../../middlewares/verifyToken";

const resourcesRoutes = Router()

resourcesRoutes.route("/:lang")
    .post(verifyToken,resourcesSchemaValidation,resourceCreate)
    .get(resourcesList)


resourcesRoutes.route("/:id/:lang")
    .get(resourcesGetById)
    .patch(verifyToken,resourcesSchemaValidation,resourcesUpdate)
    .delete(verifyToken,resourcesDelete)

export default resourcesRoutes;