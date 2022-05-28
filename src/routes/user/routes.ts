import {Request, Response, Router} from "express";
import userRegisterValidator from "../../middlewares/joi/user/register";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import {loginValidator} from "../../middlewares/joi/user/login";
import verifyToken from "../../middlewares/verifyToken";
import userUpdateValidator from "../../middlewares/joi/user/update";
import { RequestWithUser } from "../../middlewares/types/RequestWithUser";
import UserController from "../../controllers/user";
import langChecker from "../../middlewares/langChecker";

const userRoutes = Router()
const controller = new UserController()

userRoutes.post("/register/:lang",
                langChecker,
                verifyToken,
                PhotoCheck,
                userRegisterValidator,
                (req:Request,res:Response) => controller.register(req,res)
)

userRoutes.route("/:lang")
    .get(
        langChecker,
        verifyToken,
        (req:Request,res:Response) => controller.getUser(req,res)
    )
    .patch(
        langChecker,
        verifyToken,
        PhotoCheck,
        userUpdateValidator,
        (req:RequestWithUser,res:Response) => controller.update(req,res)
    )

userRoutes.post("/logout/:lang",
    langChecker,
    verifyToken,
    (req:RequestWithUser,res:Response) => controller.logout(req,res)
)

userRoutes.post("/login/:lang",
    langChecker,
    loginValidator,
    (req:Request,res:Response) => controller.login(req,res)
)

export default userRoutes;