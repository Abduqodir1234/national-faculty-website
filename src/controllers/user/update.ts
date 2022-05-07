import {Response} from "express";
import {RequestWithUser} from "../../middlewares/types/RequestWithUser";
import UserService from "../../services/UserService";

const userUpdate = async (req:RequestWithUser,res:Response) =>{
    const service = new UserService()
    const {error,message,status} = await service.updatebyId(req?.user?._id,req.body)
    return res.status(status).json({error,message})
}

export default userUpdate