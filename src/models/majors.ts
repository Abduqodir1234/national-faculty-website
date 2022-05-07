import {Schema,Document,model} from "mongoose"


export interface MajorsDocument extends Document{
    name_uz:string;
    name_ru:string;
    name_en:string;
}

const majorsSchema = new Schema({
    name_uz:{
        type:String,
        default:null
    },
    name_ru:{
        type:String,
        default:null
    },
    name_en:{
        type:String,
        default:null
    }
})

const Majors = model("majors",majorsSchema)

export default Majors;