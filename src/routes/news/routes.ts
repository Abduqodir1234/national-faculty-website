import { Request, Response, Router } from "express";
import NewsController from "../../controllers/news";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import newsSchemaValidator from "../../middlewares/joi/news/schema";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import verifyToken from "../../middlewares/verifyToken";

const newsRoutes = Router()

const controller = new NewsController()

newsRoutes.route("/:lang")
    .post(
        verifyToken,
        PhotoCheck,
        newsSchemaValidator,
        (req:RequestWithUser,res:Response) => controller.create(req,res)
    )
    .get(
        (req:Request,res:Response) => controller.list(req,res)
    )

newsRoutes.route("/:id/:lang")
    .patch(
        verifyToken,
        PhotoCheck,
        newsSchemaValidator,
        (req:RequestWithUser,res:Response) => controller.get(req,res)
    )
    .get(
        (req:Request,res:Response) => controller.get(req,res)
    )
    .delete(
        verifyToken,
        (req:Request,res:Response) => controller.delete(req,res)
    )

export default newsRoutes;