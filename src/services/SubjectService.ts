import { Request } from "express";
import { Lang } from "../middlewares/types/LangTypes";
import Subjects from "../models/subject";
import BaseService from "./BaseService";
import ResponseService from "./response";
class SubjectService extends BaseService{
    constructor(){
        super(Subjects)
    }

    async list(req:Request){
        try{
            const lang = req.params.lang as Lang["types"]
            const data = await Subjects.find({},{"name":`$name_${lang}`})
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

    async getById(req:Request){
        try{
            const id = req.params.id
            const lang = req.params.lang as Lang["types"]
            const data = await Subjects.findById(id,{"name":`$name_${lang}`})
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }
}
export default SubjectService