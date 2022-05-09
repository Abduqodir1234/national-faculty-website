import { Request, Response, Router } from "express";
import MainInfosController from "../../controllers/main";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import mainInfosSchemaValidator from "../../middlewares/joi/main/schema";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import verifyToken from "../../middlewares/verifyToken";

const mainInfosRoutes = Router()

const controller = new MainInfosController()

mainInfosRoutes.route("/:lang")
    .post(
        verifyToken,
        PhotoCheck,
        mainInfosSchemaValidator,
        (req:RequestWithUser,res:Response)=> controller.create(req,res)
    )
    .get(
        (req:Request,res:Response)=> controller.getmainInfos(req,res)
    )
    .patch(
        verifyToken,
        PhotoCheck,
        mainInfosSchemaValidator,
        (req:RequestWithUser,res:Response)=> controller.update(req,res)
    )

export default mainInfosRoutes;