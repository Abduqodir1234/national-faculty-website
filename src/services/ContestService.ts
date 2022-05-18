import Contests from "../models/contest";
import BaseService from "./BaseService";
import ResponseService from "./response";
import {Request} from "express"
import { Lang } from "../middlewares/types/LangTypes";
import { contestListLimit } from "../config";
import {Document} from "mongoose"
import {ObjectId} from "mongodb"

class ContestService extends BaseService{
    constructor(){
        super(Contests)
    }

    async list(req:Request){
        try{
            const lang = req.params.lang as Lang["types"]
            const page = req.query.page as unknown as number || 1
            const data = await Contests.aggregate([
                { '$facet': {
                    metadata: [ 
                        { $count: "total" }, 
                        { $addFields: { page: page }},
                        {$addFields: {limit:contestListLimit}} 
                    ],
                    data: [ 
                        { $skip: (page-1)*contestListLimit }, 
                        { $limit: contestListLimit },
                        { $unset:["__v"]},
                        {$project:{
                            title:`$title_${lang}`,
                            desc:`$desc_${lang}`,
                            img:"$img",date:"$date"
                        }}
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
            const {lang,id} = req.params as unknown as {lang:Lang["types"],id:Document["_id"]}
            const data = await Contests.find({_id:new ObjectId(id)},{title:`$title_${lang}`,desc:`$desc_${lang}`,img:"$img",date:"$date"})
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }
}
export default ContestService;