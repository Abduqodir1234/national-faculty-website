import {Schema,model,Document} from "mongoose"


export interface DepartmentSubjectDocument extends Document{
    subjectId:string;
    departmentId:string;
    degree:"bachelor" | "master" | "doctoral"
}

const departmentSubjectSchema = new Schema({
    subjectId:{
        type:Schema.Types.ObjectId,
        ref:"subjects"
    },
    departmentId:{
        type:Schema.Types.ObjectId,
        ref:"departments"
    },
    degree:{
        type:String,
        enum:{
            values:["bachelor","master","doctoral"],
            message:"{VALUE} not supported"
        }
    }

})

const DepartmentSubject = model("departmentSubjects",departmentSubjectSchema)

export default DepartmentSubject;