import {Schema,model} from "mongoose"

const MainSchema = new Schema({
    img:{
        type:String,
        default:null
    },
    email:{
        type:String,
        default:null
    },
    phoneNumber:{
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
    coordinate_x:{
        type:Number,
        default:null
    },
    coordinate_y:{
        type:Number,
        default:null
    },
    facebook:{
        type:String,
        default:null
    },
    instagram:{
        type:String,
        default:null
    },
    telegram:{
        type:String,
        default:null
    },
    youtube:{
        type:String,
        default:null
    },
    startWork:{
        type:String,
        default:null
    },
    endWork:{
        type:String,
        default:null
    }
})

const MainInfos = model("mainInfo",MainSchema)
export default MainInfos