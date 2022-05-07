import {Response} from "express";
import UserService from "../../services/UserService";
import {RequestWithUser} from "../../middlewares/types/RequestWithUser";

const logout = async (req:RequestWithUser,res:Response) => {
    const service = new UserService()
    const {message,error,status}  = await service.logout(req?.user?._id)
    return res.status(status).json({error,message})
}
export default logout