import { Router } from "express";
import resourceCategoryCreate from "../../controllers/resourceCategory/create";
import resourceCategoryDelete from "../../controllers/resourceCategory/delete";
import resourceCategoryGet from "../../controllers/resourceCategory/get";
import resourceCategoryList from "../../controllers/resourceCategory/list";
import resourceCategoryUpdate from "../../controllers/resourceCategory/update";
import resourceCategoryValidation from "../../middlewares/joi/resourceCategory/schema";
import verifyToken from "../../middlewares/verifyToken";

const resourceCategoryRoutes = Router()

resourceCategoryRoutes.route("/:lang")
    .post(verifyToken,resourceCategoryValidation,resourceCategoryCreate)
    .get(resourceCategoryList)


resourceCategoryRoutes.route("/:id/:lang")
    .get(resourceCategoryGet)
    .patch(verifyToken,resourceCategoryValidation,resourceCategoryUpdate)
    .delete(verifyToken,resourceCategoryDelete)
export default resourceCategoryRoutes;