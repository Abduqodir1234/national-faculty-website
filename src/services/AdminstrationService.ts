import { Request } from "express";
import { adminstrationListLimit } from "../config";
import { Lang } from "../middlewares/types/LangTypes";
import Adminstrations from "../models/adminstration";
import BaseService from "./BaseService";
import ResponseService from "./response";
import {Document} from "mongoose"
import {ObjectId} from "mongodb"
import { AdminstrationQueryProps } from "../middlewares/types/Adminstration";

class AdminstrationService extends BaseService{

    constructor(){
        super(Adminstrations)
    }

    async list(req:Request){
        try{
            const {departmentId,teacherId,page} = req.query as unknown as AdminstrationQueryProps
            const lang = req.params.lang as Lang["types"]
            let query={}
            if(departmentId)
                query = {departmentId:new ObjectId(departmentId)}
            if(teacherId)
                query = {...query,teacherId:new ObjectId(teacherId)}
            console.log(query);
            
            const data = await Adminstrations.aggregate([
                {$match:query},
                { '$facet': {
                        metadata: [ 
                            { $count: "total" }, 
                            { $addFields: { page: page||1 }},
                            {$addFields: {limit:adminstrationListLimit}} 
                        ],
                        data: [ 
                            { $skip: (page||1-1)*adminstrationListLimit }, 
                            { $limit: adminstrationListLimit },
                            { $lookup:{
                                from:"teachers",
                                localField:"teacherId",
                                foreignField:"_id",
                                as:"teacher"
                            }},
                            { $lookup:{
                                from:"departments",
                                localField:"departmentId",
                                pipeline:[
                                    {
                                        $project:{
                                            name:`$name_${lang}`,
                                            desc:`$desc_${lang}`,
                                            address:`$address_${lang}`,
                                            dean:"$dean"
                                        }
                                    }
                                ],
                                foreignField:"_id",
                                as:"department"
                            }},    
                            {$unwind:{path:"$teacher",preserveNullAndEmptyArrays:true}},
                            {$unwind:{path:"$department",preserveNullAndEmptyArrays:true}},
                            { $unset:["__v","teacherId","departmentId"]},
                        ]
                    } },
                    {$unwind:"$metadata"}
            ])
            return ResponseService.responseWithData(data[0])
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

    async getById(req:Request){
        try{
            const {lang,id} = req.params as {lang:Lang["types"],id:Document["_id"]}
            const data = await Adminstrations.findById({_id:new ObjectId(req.params.id)})
                .populate("teacherId")
                .populate({path:"departmentId",select:{name:`$name_${lang}`,desc:`$desc_${lang}`,address:`$address_${lang}`,dean:"$dean"}})
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

}

export default AdminstrationService;