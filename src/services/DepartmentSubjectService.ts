import { Request } from "express";
import { departmentSubjectListLimit } from "../config";
import { DepartmentSubjectListQueryTypes } from "../middlewares/types/DepartmentSubject";
import { Lang } from "../middlewares/types/LangTypes";
import DepartmentSubject from "../models/departmentSubject";
import BaseService from "./BaseService";
import ResponseService from "./response";
import {ObjectId} from "mongodb"

class DepartmentSubjectService extends BaseService{
    constructor(){
        super(DepartmentSubject)
    }

    async list(req:Request){
        try{
            const {page,departmentId,subjectId} = req.query as unknown as DepartmentSubjectListQueryTypes
            const lang = req.params.lang as Lang["types"]
            let query={}
            if(departmentId)
                query = {departmentId:new ObjectId(departmentId)}
            if(subjectId)
                query={...query,subjectId:new ObjectId(subjectId)}
            const data = await DepartmentSubject.aggregate([
                {$match:query},
                { '$facet': {
                        metadata: [ 
                            { $count: "total" }, 
                            { $addFields: { page: page||1 }},
                            {$addFields: {limit:departmentSubjectListLimit}} 
                        ],
                        data: [ 
                            { $skip: (page||1-1)*departmentSubjectListLimit }, 
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
            return ResponseService.responseWithData(data[0])
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