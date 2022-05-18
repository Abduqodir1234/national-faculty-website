import { Request } from "express";
import { departmentMajorsLimit } from "../config";
import { Lang } from "../middlewares/types/LangTypes";
import DepartmentMajors from "../models/departmentMajors";
import BaseService from "./BaseService";
import ResponseService from "./response";
import {Document} from "mongoose"
import {ObjectId} from "mongodb"

class DepartmentMajorsService extends BaseService{
    constructor(){
        super(DepartmentMajors)
    }

    async list(req:Request){
        try{
            const lang = req.params.lang as Lang["types"]
            const {page,departmentId} = req.query as unknown as {page:number,departmentId:Document["_id"]}
            let query={}
            if(departmentId) query={departmentId:new ObjectId(departmentId)}
            const data = await DepartmentMajors.aggregate([
                { '$facet': {
                        metadata: [ 
                            { $count: "total" }, 
                            { $addFields: { page: page||1 }},
                            {$addFields: {limit:departmentMajorsLimit}}
                        ],
                        data: [
                            {$match:{...query}},
                            { $skip: (page||1-1)*departmentMajorsLimit }, 
                            { $limit: departmentMajorsLimit },
                            { $lookup:{
                                from:"majors",
                                localField:"majorId",
                                pipeline:[{$project:{name:`$name_${lang}`}}],
                                foreignField:"_id",
                                as:"major"
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
                                    }
                                }],
                                foreignField:"_id",
                                as:"department"
                            }},
                            {$unwind:{path:"$major",preserveNullAndEmptyArrays:true}},
                            {$unwind:{path:"$department",preserveNullAndEmptyArrays:true}},
                            { $unset:["__v","majorId","departmentId"]},
                        ],
                    }
                },
                {$unwind:"$metadata"},
            ])
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }


    async getById(req:Request){
        try{
            const {id,lang} = req.params as unknown as {id:Document["_id"],lang:Lang["types"]}
            const data = await DepartmentMajors.findById(id)
                .populate({path:"departmentId",select:{name:`$name_${lang}`,desc:`$desc_${lang}`,address:`$address_${lang}`,dean:"$dean"}})
                .populate({path:"majorId",select:{name:`$name_${lang}`}})
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }


}

export default DepartmentMajorsService;