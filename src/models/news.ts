import {Schema,model,Document} from "mongoose"

export interface NewsDocument extends Document{
    title:string;
    short_desc:string;
    desc:string;
    photo:string;
    date:string;
}



const NewsSchema = new Schema({
    title_uz:{
        type:String,
        default:null
    },
    title_en:{
        type:String,
        default:null
    },
    title_ru:{
        type:String,
        default:null
    },
    short_desc:{
        type:String,
        default:null
    },
    short_desc_uz:{
        type:String,
        default:null
    },
    short_desc_ru:{
        type:String,
        default:null
    },
    short_desc_en:{
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
    date:Date,
},{timestamps:true})

const News = model("news",NewsSchema)

export default News;