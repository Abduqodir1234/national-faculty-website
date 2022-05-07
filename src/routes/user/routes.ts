import {Router} from "express";
import userRegisterValidator from "../../middlewares/joi/user/register";
import UserRegister from "../../controllers/user/register";
import PhotoCheck from "../../middlewares/fileUpload/photoCheck";
import {loginValidator} from "../../middlewares/joi/user/login";
import login from "../../controllers/user/login";
import verifyToken from "../../middlewares/verifyToken";
import userGetByToken from "../../controllers/user/get";
import logout from "../../controllers/user/logout";
import userUpdateValidator from "../../middlewares/joi/user/update";
import userUpdate from "../../controllers/user/update";

const userRoutes = Router()

userRoutes.post("/register",verifyToken,PhotoCheck,userRegisterValidator,UserRegister)
userRoutes.get("/",verifyToken,userGetByToken)
userRoutes.patch("/",verifyToken,PhotoCheck,userUpdateValidator,userUpdate)
userRoutes.post("/logout",verifyToken,logout)
userRoutes.post("/login",loginValidator,login)

export default userRoutes;