import { Request } from "express";
import { majorsListLimit } from "../config";
import { Lang } from "../middlewares/types/LangTypes";
import Majors from "../models/majors";
import BaseService from "./BaseService";
import ResponseService from "./response";
import {Document} from "mongoose"
import {ObjectId} from "mongodb"

class MajorsService extends BaseService{
    constructor(){
        super(Majors)
    }

    async list(req:Request){
        try{
            const lang = req.params.lang as Lang["types"]
            const page = req.query.page as unknown as number || 1
            const data = await Majors.aggregate([
                { '$facet': {
                    metadata: [ 
                        { $count: "total" }, 
                        { $addFields: { page: page }},
                        {$addFields: {limit:majorsListLimit}} 
                    ],
                    teachers:[
                        { $skip: (page-1)*majorsListLimit }, 
                        { $limit: majorsListLimit },
                        {$project:{
                            "name":`$name_${lang}`
                        }},
                        { $unset:["__v"]},
                    ]
                }},
                {$unwind:"$metadata"}
            ])
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

    async getById(req:Request){
        try{
            const {lang,id} = req.params as {lang:Lang["types"],id:Document["_id"]}
            const data = await Majors.findById({_id:new ObjectId(id)},{name:`$name_${lang}`})
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }
}

export default MajorsService;