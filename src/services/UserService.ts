import redis_client from "../config/redis";
import Users, { UserDocument } from "../models/user";
import BaseService from "./BaseService";
import bcrypt from "bcrypt"
import createToken from "../middlewares/createToken";
import {RequestWithUser} from "../middlewares/types/RequestWithUser";
import ResponseService from "./response";
interface UserData{
    email:string;
    password:string
}


interface UpdateDocument{
    email:string,
    fullname:string,
    photo?:string,
    password?:string
}
class UserService extends BaseService {
    constructor(){
        super(Users)
    }


    async login(req:RequestWithUser){
       try{
           const token_expire_in_seconds= process.env.TOKEN_EXPIRE_IN_SECONDS || "50"
           const data = req.body
           let user = await Users.findOne<UserDocument>({email:data.email})
           if(!user) return ResponseService.notFound()
           const IsTheSame = await bcrypt.compare(data.password,user.password)
           if(IsTheSame){
               const token2 = await redis_client.get(user._id)
               if(token2) return ResponseService.responseWithData({token:token2})
               const {error,data,message} = await createToken(user)
               if(error) return ResponseService.badRequest(message)
               await redis_client.set(user._id,data||"")
               await redis_client.expire(user._id,parseInt(token_expire_in_seconds))
               return ResponseService.responseWithData({token:data})
           }
           else return ResponseService.badRequest("Passsword not correct")
       } catch (e) {
           return ResponseService.internalServerError(e)
       }
    }

    async logout(id:string){
        try {
            const data = await redis_client.del(id)
            if(data >= 1) return ResponseService.responseOK("Logged out")
            return ResponseService.notFound()
        } catch (e) {
            return ResponseService.internalServerError(e)
        }

    }
}

export default UserService