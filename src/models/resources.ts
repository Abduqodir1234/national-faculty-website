import {Schema,model,Document} from "mongoose"


export interface ResourcesDocument extends Document{
    title_uz:string;
    title_ru:string;
    title_en:string;
    desc_uz:string;
    desc_ru:string;
    desc_en:string;
    categoryId:string;
}

const resourcesSchema = new Schema({
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
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"resourcecategories"
    },
    file:{
        type:String
    }
})

const Resources = model("resources",resourcesSchema)

export default Resources;