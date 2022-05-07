import {RequestWithUser} from "../../middlewares/types/RequestWithUser";
import {Response} from "express"

const userGetByToken = (req:RequestWithUser,res:Response) => {
    delete req.user?.__v
    delete req.user?.role
    return res.status(200).json({error:false,data:req.user})

}
export default userGetByToken;