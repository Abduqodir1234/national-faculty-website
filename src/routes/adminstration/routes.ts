import { Router } from "express";
import adminstrationCreate from "../../controllers/adminstration/create";
import adminstrationDelete from "../../controllers/adminstration/delete";
import adminstrationGetByid from "../../controllers/adminstration/get";
import adminstrationList from "../../controllers/adminstration/list";
import adminstrationUpdate from "../../controllers/adminstration/update";
import adminstrationsValidation from "../../middlewares/joi/adminstration/schema";
import verifyToken from "../../middlewares/verifyToken";

const adminstrationRoutes = Router()

adminstrationRoutes.route('/:lang')
    .post(verifyToken,adminstrationsValidation,adminstrationCreate)
    .get(adminstrationList)


adminstrationRoutes.route('/:id/:lang')
    .patch(verifyToken,adminstrationsValidation,adminstrationUpdate)
    .delete(verifyToken,adminstrationDelete)
    .get(adminstrationGetByid)

export default adminstrationRoutes;