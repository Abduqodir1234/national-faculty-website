import { Request, Response, Router } from "express";
import MainInfosController from "../../controllers/main";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import mainInfosSchemaValidator from "../../middlewares/joi/main/schema";
import langChecker from "../../middlewares/langChecker";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import verifyToken from "../../middlewares/verifyToken";

const mainInfosRoutes = Router()

const controller = new MainInfosController()

mainInfosRoutes.route("/:lang")
    .post(
        langChecker,
        verifyToken,
        PhotoCheck,
        mainInfosSchemaValidator,
        (req:RequestWithUser,res:Response)=> controller.create(req,res)
    )
    .get(
        langChecker,
        (req:Request,res:Response)=> controller.getmainInfos(req,res)
    )
    .patch(
        langChecker,
        verifyToken,
        PhotoCheck,
        mainInfosSchemaValidator,
        (req:RequestWithUser,res:Response)=> controller.update(req,res)
    )

export default mainInfosRoutes;