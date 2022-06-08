import {Schema,model,Document} from "mongoose"


export interface DepartmentMajorsDocument extends Document{
    majorId:string;
    degree: "bachelor" | "master" | "doctoral";
    departmentId:string;
    code:string
}


const departMentMajorsSchema = new Schema({
    majorId:{
        type:Schema.Types.ObjectId,
        ref:"majors"
    },
    degree:{
        type:String,
        enum:{
            values:["bachelor","master","doctoral"],
            message:"{VALUE} not supported"
        }
    },
    departmentId:{
        type:Schema.Types.ObjectId,
        ref:"departments"
    },
    // Unique code for this major
    code:{
        type:String,
        unique:true
    }
})

const DepartmentMajors = model("departmentMajors",departMentMajorsSchema)

export default DepartmentMajors; 