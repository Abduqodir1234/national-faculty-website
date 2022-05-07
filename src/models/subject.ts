import { Schema,Document,model} from "mongoose";


export interface SubjectDocument extends Document {
    name:string;
}

const subjectSchema = new Schema({
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

const Subjects = model("subjects",subjectSchema)
export default Subjects;