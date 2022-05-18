import BaseService from "./BaseService";
import Department from "../models/deparments";
import {Document} from "mongoose";
import ResponseService from "./response";
import {Lang} from "../middlewares/types/LangTypes";
import {ObjectId} from "mongodb";
import { Request } from "express";
import { departmentListLimit } from "../config";


class DepartmentService extends BaseService{
    constructor() {
        super(Department);
    }

    async getById(req:Request){
        try{
            const {lang,id} = req.params as {lang:Lang["types"],id:Document["_id"]}
            const data = await Department
                .findById(id,{
                    name:`$name_${lang}`,
                    desc:`$desc_${lang}`,
                    address:`$address_${lang}`,  
                    dean:1
                })
                .populate("dean",["-__v","-departmentId"])
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

    async list(req:Request){
        try{
            const lang = req.params.lang as Lang["types"]
            const page = req.query.page as unknown as number || 1
            const data = await Department.aggregate([
                { '$facet': {
                        metadata: [ 
                            { $count: "total" }, 
                            { $addFields: { page: page}},
                            {$addFields: {limit:departmentListLimit}}
                        ],
                        data: [
                            { $skip: (page-1)*departmentListLimit }, 
                            { $limit: departmentListLimit },
                            { $lookup:{
                                from:"teachers",
                                localField:"dean",
                                foreignField:"_id",
                                as:"dean"
                            }},
                            {$unwind:{path:"$dean",preserveNullAndEmptyArrays:true}},
                            {$project:{
                                name:`$name_${lang}`,
                                desc:`$desc_${lang}`,
                                address:`$address_${lang}`,
                                dean:"$dean"
                            }},
                            { $unset:["__v"]},
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
}
export default DepartmentService;