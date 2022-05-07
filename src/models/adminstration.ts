import {Schema,model,Document} from "mongoose"


export interface AdminstrationsSchema extends Document{
    teacherId:string;
    reception_time_starts:string;
    reception_time_ends:string;
}


const adminstrationSchema = new Schema({
    teacherId:{
        type:Schema.Types.ObjectId,
        ref:"teachers"
    },
    departmentId:{
        type:Schema.Types.ObjectId,
        ref:"departments"
    },
    reception_time_starts:{
        type:String,
    },
    reception_time_ends:{
        type:String,
    },
})

const Adminstrations = model("adminstrations",adminstrationSchema)

export default Adminstrations;