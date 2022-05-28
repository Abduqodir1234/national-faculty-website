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
            const {name,page} = req.query as unknown as {page:number,name:string}
            const lang = req.params.lang as Lang["types"]
            let query={}
            if(name)
                query = {[`name_${lang}`]:name}
            const data = await Subjects.aggregate([
                {$match:query},
                { '$facet': {
                    metadata: [ 
                        { $count: "total" }, 
                        { $addFields: { page: page||1 }},
                        {$addFields: {limit:subjectListLimit}} 
                    ],
                    data: [ 
                        { $skip: (page||1-1)*subjectListLimit },
                        { $limit: subjectListLimit },
                        { $project:{"name":`$name_${lang}`}},
                        { $unset:["__v","majorId"]},
                    ]
                } },
                {$unwind:"$metadata"}
            ])
            console.log(data);
            
            return ResponseService.responseWithData(data[0])
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