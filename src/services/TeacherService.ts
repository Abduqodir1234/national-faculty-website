import BaseService from "./BaseService";
import Teachers, {TeacherDocument} from "../models/teacher";
import {ObjectId} from "mongodb";
import ResponseService from "./response";
import { Request } from "express";
import { teacherListLimit } from "../config";
import { Lang } from "../middlewares/types/LangTypes";
import { TeacherListQueryProps } from "../middlewares/types/teachers";

class TeacherService extends BaseService{
    constructor() {
        super(Teachers);
    }


    async list(req:Request) {
        try{
            const {departmentId,educationTitle,email,fullname,page} = req.query as unknown as TeacherListQueryProps
            let query={}
            if(departmentId)
                query = {departmentId:new ObjectId(departmentId)}
            if(educationTitle)
                query={...query,educationTitle}
            if(email)
                query={...query,email}
            if(fullname)
                query={...query,fullname}
            const lang = req.params.lang as Lang["types"]
            const data = await Teachers.aggregate([
                {$match:query},
                { '$facet': {
                        metadata: [ 
                            { $count: "total" }, 
                            { $addFields: { page: page||1 }},
                            {$addFields: {limit:teacherListLimit}} 
                        ],
                        data: [ 
                            { $skip: (page || 1 -1)*teacherListLimit }, 
                            { $limit: teacherListLimit },{$unset:["__v"]},
                        ]
                    } },
                {$unwind:{path:"$metadata",preserveNullAndEmptyArrays:true}}
            ])
            return ResponseService.responseWithData(data[0])
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
export default TeacherService;