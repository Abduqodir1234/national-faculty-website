import {Schema,model,Document} from "mongoose"
import bcrypt from "bcrypt"

export interface UserDocument extends Document{
    fullname:string;
    email:string;
    password:string;
    img?:string
    role?: "admin" | "user" | "teacher"
}


let UserSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        index:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        enum:{
            values:["admin","user","teacher"],
            message:"{VALUE not supported}"
        },
        default:"admin"
    }
},{timestamps:true})



const Users = model("users",UserSchema)

export default Users;