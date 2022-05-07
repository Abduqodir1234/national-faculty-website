import { Request } from "express";
import { adminstrationListLimit } from "../config";
import { Lang } from "../middlewares/types/LangTypes";
import Adminstrations from "../models/adminstration";
import BaseService from "./BaseService";
import ResponseService from "./response";
import {Document} from "mongoose"
import {ObjectId} from "mongodb"

class AdminstrationService extends BaseService{

    constructor(){
        super(Adminstrations)
    }

    async list(req:Request){
        try{
            const page = req.query.page as unknown as number || 1
            const lang = req.params.lang as Lang["types"]
            const data = await Adminstrations.aggregate([
                { '$facet': {
                        metadata: [ { $count: "total" }, { $addFields: { page: page }},{$addFields: {limit:adminstrationListLimit}} ],
                        data: [ 
                            { $lookup:{
                                from:"teachers",
                                localField:"teacherId",
                                foreignField:"_id",
                                as:"teacher"
                            }},
                            { $lookup:{
                                from:"departments",
                                localField:"departmentId",
                                pipeline:[{$project:{name:`$name_${lang}`,desc:`$desc_${lang}`,address:`$address_${lang}`,dean:"$dean"}}],
                                foreignField:"_id",
                                as:"department"
                            }},
                            { $skip: (page-1)*adminstrationListLimit }, 
                            { $limit: adminstrationListLimit },
                            { $unset:["__v","teacherId","departmentId"]},
                            
                        ]
                    } }
            ])
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

    async getByid(req:Request){
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