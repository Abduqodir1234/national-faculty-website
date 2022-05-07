import jwt from "jsonwebtoken"
import {UserDocument} from "../models/user";
interface JwtPayload{
    [key: string]: any;
    iss?: string | undefined;
    sub: UserDocument | undefined;
    aud?: string | string[] | undefined;
    exp?: number | undefined;
    nbf?: number | undefined;
    iat?: number | undefined;
    jti?: string | undefined;
}
const decode = async (token:string) => {
    try{
        const secret = process.env.TOKEN_SECRET || ""
        const decoded = jwt.verify(token,secret) as JwtPayload || undefined
        return {error:false,msg:"",data:decoded}
    } catch (e) {
      return {error:true,msg:e}
    }

}
export default decode;