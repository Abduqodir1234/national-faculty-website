import { Router } from "express";
import mainInfosCreate from "../../controllers/main/create";
import mainInfosGetById from "../../controllers/main/get";
import mainInfosUpdate from "../../controllers/main/update";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import mainInfosSchemaValidator from "../../middlewares/joi/main/schema";
import verifyToken from "../../middlewares/verifyToken";

const mainInfosRoutes = Router()

mainInfosRoutes.route("/:lang")
    .post(verifyToken,PhotoCheck,mainInfosSchemaValidator,mainInfosCreate)
    .get(mainInfosGetById)
    .patch(verifyToken,PhotoCheck,mainInfosSchemaValidator,mainInfosUpdate)

export default mainInfosRoutes;