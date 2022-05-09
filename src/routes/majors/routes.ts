import { Request, Response, Router } from "express";
import MajorController from "../../controllers/majors";
import majorsSchema from "../../middlewares/joi/major/schema";
import verifyToken from "../../middlewares/verifyToken";

const majorRoutes = Router()
const controllers = new MajorController()

majorRoutes.route("/:lang")
    .post(
        verifyToken,
        majorsSchema,
        (req:Request,res:Response) => controllers.create(req,res)
    )
    .get(
        (req:Request,res:Response) => controllers.list(req,res)
    )

majorRoutes.route("/:id/:lang")
    .get(
        (req:Request,res:Response) => controllers.get(req,res)
    )
    .delete(
        verifyToken,
        (req:Request,res:Response) => controllers.delete(req,res)
    )
    .patch(
        verifyToken,
        majorsSchema,
        (req:Request,res:Response) => controllers.update(req,res)
    )
export default majorRoutes;