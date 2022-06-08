import {model, Schema,Document} from "mongoose";


export interface TeacherDocument extends Document{
    fullname:string;
    title:string;
    educationTitle:"Stajor_oqituvchi" | "oqituvchi" | "katta_oqituvchi" | "dotsent" | "professor" | "akademik";
    birthdate:string;
    passportSeries:string;
    passportNumber:string;
    email:string;
    img:string;
    is_MA:string;
    study_foreign:string;
    departmentId:string;
    dateOfEntry:string;

}

const TeacherSchema = new Schema({
    fullname:String,
    title:String,
    educationTitle:{
        type:String,
        enum: {
            values: ["Stajor_oqituvchi", "oqituvchi", "katta_oqituvchi", "dotsent", "professor", "akademik"],
            message: "{VALUE} not supported"
        }
    },
    birthdate:Date,
    passportSeries:String,
    passportNumber:String,
    email:String,
    img:String,
    is_MA:Boolean,
    study_foreign:Boolean,
    departmentId:{
        type:Schema.Types.ObjectId,
        ref:"departments"
    },
    dateOfEntry:Date
})

const Teachers = model("teachers",TeacherSchema)
export default Teachers;