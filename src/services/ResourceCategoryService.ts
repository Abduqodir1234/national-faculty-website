import { Request } from "express";
import { resourceCategoryListLimit } from "../config";
import { Lang } from "../middlewares/types/LangTypes";
import ResourceCategory from "../models/resourceCategory";
import BaseService from "./BaseService";
import ResponseService from "./response";
import {Document} from "mongoose"

class ResourceCategoryService extends BaseService{
    constructor(){
        super(ResourceCategory)
    }

   async list(req:Request){
        try{
            const {name,page} = req.query as unknown as {page?:number,name:string;}
            let query = {}
            const lang = req.params.lang as Lang["types"]
            if(name)
                query={[`name_${lang}`]:name}
            const data = await ResourceCategory.aggregate([
                {$match:query},
                { '$facet': {
                    metadata: [ 
                        { $count: "total" }, 
                        { $addFields: { page: page||1 }},
                        {$addFields: {limit:resourceCategoryListLimit}} 
                    ],
                    data: [
                        { $skip: (page||1-1)*resourceCategoryListLimit }, 
                        { $limit: resourceCategoryListLimit },
                        { $project:{name:`$name_${lang}`}},
                        { $unset:["__v",]},   
                    ]
                }},
                {$unwind:"$metadata"}
            ])
            return ResponseService.responseWithData(data[0])
        } catch(e){
            return ResponseService.internalServerError(e)
        }
   }

   async getById(req:Request){
    try{
        const {lang,id} = req.params as unknown as {lang:Lang["types"],id:Document["_id"]}
        const data = await ResourceCategory.findById(id,{name:`$name_${lang}`})
        if(!data)
            return ResponseService.notFound()
        return ResponseService.responseWithData(data)
    } catch(e){
        return ResponseService.internalServerError(e)
    }
}
}
export default ResourceCategoryService;