import { Request } from "express";
import News from "../models/news";
import BaseService from "./BaseService";
import ResponseService from "./response";
import {Document} from "mongoose"
import {ObjectId} from "mongodb"
import { Lang } from "../middlewares/types/LangTypes";
import { newsPaginationLimit } from "../config";

class NewsService extends BaseService{
    constructor(){
        super(News)
    }

    async list(req:Request){
        try{
            let query={}
            const page = req.query.page as unknown as number || 1
            const {lang} = req.params as {lang:Lang["types"]}
            const {short_desc,title} = req.query as {title?:string;short_desc?:string}
            if(short_desc)
                query = {...query,[`short_desc_${lang}`]:short_desc}
            if(title)
            query = {...query,[`title_${lang}`]:title}            
            const data = await News.aggregate([
                {$match:query},
                { '$facet': {
                        metadata: [ 
                            { $count: "total" }, 
                            { $addFields: { page: page }},
                            { $addFields: {limit:newsPaginationLimit}} 
                        ],
                        data: [ 
                            { $skip: -(page-1)*newsPaginationLimit }, 
                            { $limit: newsPaginationLimit },
                            { $project:{
                                title:`$title_${lang}`,
                                short_desc:`$short_desc_${lang}`,
                                desc:`$desc_${lang}`,
                                date:`$date`
                            }}   
                        ]
                    },     
                },
                {$unwind:"$metadata"}
            ])
            return ResponseService.responseWithData(data[0])
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

    async getById(req:Request){
        try{
            const {id,lang} = req.params as {id:Document["_id"],lang:Lang["types"]}
            const data = await News.findById(
                new ObjectId(id),
                {
                    title:`$title_${lang}`,
                    short_desc:`$short_desc_${lang}`,
                    desc:`$desc_${lang}`,
                    date:"$date"
                }
            )
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)

        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }
}

export default NewsService