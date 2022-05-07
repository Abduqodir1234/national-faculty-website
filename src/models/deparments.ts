import {model, Schema,Document} from "mongoose";

export interface DepartmentsDocument extends Document{
    name:string;
    dean:string;
    desc:string;
    address:string;
}


const deparmentsSchema = new Schema({
    name_ru:{
        type:String,
        default:null
    },
    name_uz:{
        type:String,
        default:null
    },
    name_en:{
        type:String,
        default:null
    },
    dean:{
        type:Schema.Types.ObjectId,
        ref:"teachers",
        default:null
    },
    desc_uz:{
        type:String,
        default:null
    },
    desc_ru:{
        type:String,
        default:null
    },
    desc_en:{
        type:String,
        default:null
    },
    address_uz:{
        type:String,
        default:null
    },
    address_ru:{
        type:String,
        default:null
    },
    address_en:{
        type:String,
        default:null
    },
})

const Department = model("departments",deparmentsSchema)
export default Department;