import {Schema,model} from "mongoose"

const talentedSchema = new Schema({
    fullname:String,
    birthdate:Schema.Types.Date,
    address:String,
    title:String,
    majorId:{
        type:Schema.Types.ObjectId,
        ref:"majors"
    },
    specialization:String,
    img:String,
    desc:String
})

const Talenteds = model("talentedStudents",talentedSchema)
export default Talenteds;
