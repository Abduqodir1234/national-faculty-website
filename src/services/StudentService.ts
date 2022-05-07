import { Request } from "express";
import { talentedStudentListLimit } from "../config";
import { Lang } from "../middlewares/types/LangTypes";
import Talenteds from "../models/talented";
import BaseService from "./BaseService";
import {Document} from 'mongoose'
import ResponseService from "./response";

class TalentedStudentsService extends BaseService{
    constructor(){
        super(Talenteds)
    }

    async list(req:Request){
        try{
            const page = req.query.page as unknown as number || 1
            const lang = req.params.lang as Lang["types"]
            const data = await Talenteds.aggregate([
                { '$facet': {
                    metadata: [ { $count: "total" }, { $addFields: { page: page }},{$addFields: {limit:talentedStudentListLimit}} ],
                    data: [ 
                        { $skip: (page-1)*talentedStudentListLimit },
                        { $limit: talentedStudentListLimit },
                        { $lookup:{
                            from:"majors",
                            localField:"majorId",
                            foreignField:"_id",
                            pipeline:[{$project:{name:`$name_${lang}`}}],
                            as:"major"
                        }},
                        { $unset:["__v","majorId"]},
                    ]
                } }
            ])
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }


    async getById(req:Request){
        try{
            const {lang,id} = req.params as {lang:Lang["types"],id:Document["_id"]}
            const data = await Talenteds.findById(id).populate({path:"majorId",select:{name:`$name_${lang}`}})
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }
}
export default TalentedStudentsService;