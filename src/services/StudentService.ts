import { Request } from "express";
import { talentedStudentListLimit } from "../config";
import { Lang } from "../middlewares/types/LangTypes";
import Talenteds from "../models/talented";
import BaseService from "./BaseService";
import {Document} from 'mongoose'
import ResponseService from "./response";

class TalentedStudentsService extends BaseService{
    constructor(){
        super(Talenteds)
    }

    async list(req:Request){
        try{
            const page = req.query.page as unknown as number || 1
            const lang = req.params.lang as Lang["types"]
            const data = await Talenteds.aggregate
            metadata: [ { $count: "total" }, { $addFields: { page: page }},{$addFields: {limit:teacherListLimit}} ],
            teachers: [ 
                { $skip: (page-1)*teacherListLimit }, 
                { $limit: teacherListLimit },{$unset:["__v"]},
                // { $lookup:{
                //     from:"departments",
                //     localField:"departmentId",
                //     pipeline:[{$project:{name:`$name_${lang}`,desc:`$desc_${lang}`,address:`$address_${lang}`,dean:"$dean"}}],
                //     foreignField:"_id",
                //     as:"department"
                // }},
                // {$unwind:{path:"$department",preserveNullAndEmptyArrays:true}}
            ]
        } },
    {$unwind:{path:"$metadata",preserveNullAndEmptyArrays:true}}
])
return ResponseService.responseOK("",data)
} catch (e) {
console.log(e);

return ResponseService.internalServerError(e)
}
}


async getById(req:Request){
try{
const id = req.params.id
const data = await Teachers.findById(new ObjectId(id))
    .select("-__v")
    .populate("departmentId","name -_id")
if(!data) return ResponseService.notFound()
return ResponseService.responseWithData(data)

} catch (e) {
return ResponseService.internalServerError(e)
}
}


}
export default TeacherService
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }


    async getById(req:Request){
        try{
            const {lang,id} = req.params as {lang:Lang["types"],id:Document["_id"]}
            const data = await Talenteds.findById(id).populate({path:"majorId",select:{name:`$name_${lang}`}})
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }
}
export default TalentedStudentsService;