import { Request } from "express";
import {Document} from "mongoose"
import { resourceCategoryListLimit } from "../config";
import { Lang } from "../middlewares/types/LangTypes";
import Resources from "../models/resources";
import BaseService from "./BaseService";
import ResponseService from "./response";
import {ObjectId} from "mongodb"

class ResourcesService extends BaseService{
    constructor(){
        super(Resources)
    }

    async list(req:Request){
        try{
            const lang = req.params.lang as Lang["types"]
            const {page,categoryId} = req.query as unknown as {page:number,categoryId:Document["_id"]}
            let query={}
            if(categoryId)
                query={categoryId:new ObjectId(categoryId)}
            const data = await Resources.aggregate([
                { '$facet': {
                    metadata: [ 
                        { $count: "total" }, 
                        { $addFields: { page: page||1 }},
                        {$addFields: {limit:resourceCategoryListLimit}} 
                    ],
                    data: [
                        {$match:query},
                        { $skip: (page||1-1)*resourceCategoryListLimit }, 
                        { $limit: resourceCategoryListLimit },
                        { $lookup:{
                            from:"resourcecategories",
                            localField:"categoryId",
                            pipeline:[{$project:{name:`$name_${lang}`}}],
                            foreignField:"_id",
                            as:"category"
                        }},
                        {$unwind:{path:"$category",preserveNullAndEmptyArrays:true}},
                        {$project:{
                            title:`$title_${lang}`,
                            desc:`$desc_${lang}`,
                            category:"$category"
                        }},
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
            const {lang,id} = req.params as {lang:Lang["types"],id:Document["_id"]}
            const data = await Resources.findById(new ObjectId(id),{
                title:`$title_${lang}`,
                desc:`$desc_${lang}`,
                categoryId:"$categoryId"
            })
                .populate({path:"categoryId",select:{name:`$name_${lang}`}})
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }
}

export default ResourcesService;