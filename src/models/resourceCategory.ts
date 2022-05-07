import {Schema,model,Document} from "mongoose"


export interface ResourceCategoryDocument extends Document{
    name_uz:string;
    name_ru:string;
    name_en:string
}


const resourceCategorySchema = new Schema({
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
    },
})
const ResourceCategory = model("resourcecategories",resourceCategorySchema)
export default ResourceCategory;