import {Request} from "express"
import {UserDocument} from "../../models/user";
export interface RequestWithUser extends Request{
    user?:UserDocument,
    body2?:{translates?:any,body?:any}
}