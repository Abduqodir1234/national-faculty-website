import { Request } from "express";
import { subjectListLimit } from "../config";
import { Lang } from "../middlewares/types/LangTypes";
import Subjects from "../models/subject";
import BaseService from "./BaseService";
import ResponseService from "./response";
class SubjectService extends BaseService{
    constructor(){
        super(Subjects)
    }

    async list(req:Request){
        try{
            const lang = req.params.lang as Lang["types"]
            const page = req.query.page as unknown as number || 1;
            const data = await Subjects.aggregate([
                { '$facet': {
                    metadata: [ 
                        { $count: "total" }, 
                        { $addFields: { page: page }},
                        {$addFields: {limit:subjectListLimit}} 
                    ],
                    data: [ 
                        { $skip: (page-1)*subjectListLimit },
                        { $limit: subjectListLimit },
                        { $project:{"name":`$name_${lang}`}},
                        { $unset:["__v","majorId"]},
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
            const data = await Subjects.findById(id,{"name":`$name_${lang}`})
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }
}
export default SubjectService