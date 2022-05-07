import { Router } from "express";
import newsCreate from "../../controllers/news/create";
import newsDelete from "../../controllers/news/delete";
import newsGetById from "../../controllers/news/get";
import newsList from "../../controllers/news/list";
import newsUpdate from "../../controllers/news/update";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import newsSchemaValidator from "../../middlewares/joi/news/schema";
import verifyToken from "../../middlewares/verifyToken";

const newsRoutes = Router()

newsRoutes.route("/:lang")
    .post(verifyToken,PhotoCheck,newsSchemaValidator,newsCreate)
    .get(newsList)

newsRoutes.route("/:id/:lang")
    .patch(verifyToken,PhotoCheck,newsSchemaValidator,newsUpdate)
    .get(newsGetById)
    .delete(verifyToken,newsDelete)

export default newsRoutes;