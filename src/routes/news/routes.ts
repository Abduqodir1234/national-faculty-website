import { Request, Response, Router } from "express";
import NewsController from "../../controllers/news";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import newsSchemaValidator from "../../middlewares/joi/news/schema";
import langChecker from "../../middlewares/langChecker";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import verifyToken from "../../middlewares/verifyToken";

const newsRoutes = Router()

const controller = new NewsController()

newsRoutes.route("/:lang")
    .post(
        langChecker,
        verifyToken,
        PhotoCheck,
        newsSchemaValidator,
        (req:RequestWithUser,res:Response) => controller.create(req,res)
    )
    .get(
        langChecker,
        (req:Request,res:Response) => controller.list(req,res)
    )

newsRoutes.route("/:id/:lang")
    .patch(
        langChecker,
        verifyToken,
        PhotoCheck,
        newsSchemaValidator,
        (req:RequestWithUser,res:Response) => controller.update(req,res)
    )
    .get(
        langChecker,
        (req:Request,res:Response) => controller.get(req,res)
    )
    .delete(
        langChecker,
        verifyToken,
        (req:Request,res:Response) => controller.delete(req,res)
    )

export default newsRoutes;