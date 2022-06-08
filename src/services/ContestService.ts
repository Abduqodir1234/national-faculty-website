import Contests from "../models/contest";
import BaseService from "./BaseService";
import ResponseService from "./response";
import {Request} from "express"
import { Lang } from "../middlewares/types/LangTypes";
import { contestListLimit } from "../config";
import {Document} from "mongoose"
import {ObjectId} from "mongodb"
import { ContestQueryProps } from "../../cypress/types/contest";

class ContestService extends BaseService{
    constructor(){
        super(Contests)
    }

    async list(req:Request){
        try{
            const {title,page} = req.query as unknown as ContestQueryProps
            const lang = req.params.lang as Lang["types"]
            let query={}
            if(title)
                query = {[`title_${lang}`]:title}
            const data = await Contests.aggregate([
                {$match:query},
                { '$facet': {
                    metadata: [ 
                        { $count: "total" }, 
                        { $addFields: { page: page|| 1 }},
                        {$addFields: {limit:contestListLimit}} 
                    ],
                    data: [ 
                        { $skip: (page||1-1)*contestListLimit }, 
                        { $limit: contestListLimit },
                        { $unset:["__v"]},
                        {$project:{
                            title:`$title_${lang}`,
                            desc:`$desc_${lang}`,
                            img:"$img",date:"$date"
                        }}
                    ]
                } },
                {$unwind:{path:"$metadata",preserveNullAndEmptyArrays:true}}
            ])
            return ResponseService.responseWithData(data[0])
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }


    async getById(req:Request){
        try{
            const {lang,id} = req.params as unknown as {lang:Lang["types"],id:Document["_id"]}
            const data = await Contests.findOne({_id:new ObjectId(id)},{title:`$title_${lang}`,desc:`$desc_${lang}`,img:"$img",date:"$date"})
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }
} 
export default ContestService;