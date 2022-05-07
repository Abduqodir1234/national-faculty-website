import {Schema,Document,model} from "mongoose"
import { DocumentWithTimestamps } from "../middlewares/types/timestamps"


export interface ContestDocument extends DocumentWithTimestamps{
    title_uz:string;
    desc_uz:string;
    title_ru:string;
    desc_ru:string;
    title_en:string;
    desc_en:string;
    img:string;
    date:string
}


const contestSchema = new Schema({
    title_uz:{
        type:String,
        default:null
    },
    title_ru:{
        type:String,
        default:null
    },
    title_en:{
        type:String,
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
    img:String,
    date:Date
},{timestamps:true})

const Contests = model("contest",contestSchema)
export default Contests;