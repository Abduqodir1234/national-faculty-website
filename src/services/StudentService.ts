import { Request } from "express";
import { talentedStudentListLimit } from "../config";
import { Lang } from "../middlewares/types/LangTypes";
import Talenteds from "../models/talented";
import BaseService from "./BaseService";
import {Document} from 'mongoose'
import ResponseService from "./response";
import { TalentedStudentListQueryTypes } from "../middlewares/types/TalentedStudents";
import {ObjectId} from "mongodb"

class TalentedStudentsService extends BaseService{
    constructor(){
        super(Talenteds)
    }

    async list(req:Request){
        try{
            const {fullname,majorId,specialization,title,page} = req.query as unknown as TalentedStudentListQueryTypes
            const lang = req.params.lang as Lang["types"]
            let query={}
            if(fullname)
                query={fullname}
            if(majorId)
                query={...query,majorId:new ObjectId(majorId)}
            if(specialization)
                query={...query,specialization}
            if(title)
                query={...query,title}
            const data = await Talenteds.aggregate([
                {$match:query},
                { '$facet': {
                    metadata: [ 
                        { $count: "total" }, 
                        { $addFields: { page: page||1 }},
                        {$addFields: {limit:talentedStudentListLimit}} 
                    ],
                    data: [ 
                        { $skip: (page||1-1)*talentedStudentListLimit },
                        { $limit: talentedStudentListLimit },
                        { $lookup:{
                            from:"majors",
                            localField:"majorId",
                            foreignField:"_id",
                            pipeline:[{$project:{name:`$name_${lang}`}}],
                            as:"major"
                        }},
                        {$unwind:{path:"$major",preserveNullAndEmptyArrays:true}},
                        { $unset:["__v","majorId"]},
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
            const {lang,id} = req.params as {lang:Lang["types"],id:Document["_id"]}
            const data = await Talenteds.findById(id).populate(
                {
                    path:"majorId",
                    select:{name:`$name_${lang}`}
                }
            )
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }
}
export default TalentedStudentsService;