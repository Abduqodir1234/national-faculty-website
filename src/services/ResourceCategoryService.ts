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
            const page = req.query.page as unknown as number || 1
            const lang = req.params.lang as Lang["types"]
            const data = await ResourceCategory.aggregate([
                { '$facet': {
                    metadata: [ { $count: "total" }, { $addFields: { page: page }},{$addFields: {limit:resourceCategoryListLimit}} ],
                    data: [
                        { $skip: (page-1)*resourceCategoryListLimit }, 
                        { $limit: resourceCategoryListLimit },
                        { $project:{name:`$name_${lang}`}},
                        { $unset:["__v",]},   
                    ]
                } }
            ])
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
   }

   async getbyId(req:Request){
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