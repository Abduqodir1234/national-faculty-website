import { Request } from "express";
import { Lang } from "../middlewares/types/LangTypes";
import DepartmentSubject from "../models/departmentSubject";
import BaseService from "./BaseService";
import ResponseService from "./response";

class DepartmentSubjectService extends BaseService{
    constructor(){
        super(DepartmentSubject)
    }

    async list(req:Request){
        try{
            const lang = req.params.lang as Lang["types"]
            const data = await DepartmentSubject.find({})
                .populate({
                    path:"subjectId",
                    select:{name:`$name_${lang}`}
                })
                .populate({
                    path:"departmentId",
                    select:{name:`$name_${lang}`,desc:`$desc_${lang}`,address:`$address_${lang}`,dean:"$dean"}
                })
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

    async getByid(req:Request){
        try{
            const id = req.params.id
            const lang = req.params.lang as Lang["types"]
            const data = await DepartmentSubject.findById(id)
            .populate({
                path:"subjectId",
                select:{name:`$name_${lang}`}
            })
            .populate({
                path:"departmentId",
                select:{name:`$name_${lang}`,desc:`$desc_${lang}`,address:`$address_${lang}`,dean:"$dean"}
            })
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }
}
export default DepartmentSubjectService;