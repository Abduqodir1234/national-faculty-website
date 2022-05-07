import { Router } from "express";
import aboutCreate from "../../controllers/about/create";
import aboutGet from "../../controllers/about/get";
import aboutUpdate from "../../controllers/about/update";
import aboutSchemaValidation from "../../middlewares/joi/about/schema";
import verifyToken from "../../middlewares/verifyToken";

const aboutRoutes = Router()

aboutRoutes.route("/:lang")
    .post(verifyToken,aboutSchemaValidation,aboutCreate)
    .patch(verifyToken,aboutSchemaValidation,aboutUpdate)
    .get(aboutGet)

export default aboutRoutes;