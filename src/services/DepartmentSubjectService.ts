import { Request } from "express";
import { departmentSubjectListLimit } from "../config";
import { Lang } from "../middlewares/types/LangTypes";
import DepartmentSubject from "../models/departmentSubject";
import BaseService from "./BaseService";
import ResponseService from "./response";

class DepartmentSubjectService extends BaseService{
    constructor(){
        super(DepartmentSubject)
    }

    async list(req:Request){
        try{
            const lang = req.params.lang as Lang["types"]
            const page = req.query.page as unknown as number || 1
            const data = await DepartmentSubject.aggregate([
                { '$facet': {
                        metadata: [ 
                            { $count: "total" }, 
                            { $addFields: { page: page }},
                            {$addFields: {limit:departmentSubjectListLimit}} 
                        ],
                        data: [ 
                            { $skip: (page-1)*departmentSubjectListLimit }, 
                            { $limit: departmentSubjectListLimit },
                            { $lookup:{
                                from:"subjects",
                                localField:"subjectId",
                                pipeline:[{$project:{name:`$name_${lang}`}}],
                                foreignField:"_id",
                                as:"subject"
                            }},
                            { $lookup:{
                                from:"departments",
                                localField:"departmentId",
                                pipeline:[
                                    {$project:{
                                        name:`$name_${lang}`,
                                        desc:`$desc_${lang}`,
                                        address:`$address_${lang}`,
                                        dean:"$dean"
                                    }}
                                ],
                                foreignField:"_id",
                                as:"department"
                            }},    
                            {$unwind:{path:"$subject",preserveNullAndEmptyArrays:true}},
                            {$unwind:{path:"$department",preserveNullAndEmptyArrays:true}},
                            { $unset:["__v","subjectId","departmentId"]},
                        ]
                    } },
                    {$unwind:"$metadata"}
            ])
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

    async getById(req:Request){
        try{
            const id = req.params.id
            const lang = req.params.lang as Lang["types"]
            const data = await DepartmentSubject.findById(id)
            .populate({
                path:"subjectId",
                select:{name:`$name_${lang}`}
            })
            .populate({
                path:"departmentId",
                select:{
                    name:`$name_${lang}`,
                    desc:`$desc_${lang}`,
                    address:`$address_${lang}`,
                    dean:"$dean"
                }
            })
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }
}
export default DepartmentSubjectService;