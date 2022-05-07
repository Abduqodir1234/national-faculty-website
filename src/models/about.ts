import {Schema,model,Document} from "mongoose"

export interface AboutDocument extends Document{
    desc_uz:string;
    desc_ru:string;
    desc_en:string;
}

const aboutSchema = new Schema({
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
})

const About = model("about",aboutSchema)

export default About;