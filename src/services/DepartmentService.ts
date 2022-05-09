import BaseService from "./BaseService";
import Department from "../models/deparments";
import {Document} from "mongoose";
import ResponseService from "./response";
import {Lang} from "../middlewares/types/LangTypes";
import {ObjectId} from "mongodb";
import { Request } from "express";


class DepartmentService extends BaseService{
    constructor() {
        super(Department);
    }

    async getById(req:Request){
        try{
            const {lang,id} = req.params as {lang:Lang["types"],id:Document["_id"]}
            const data = await Department
                .findById(id,{name:`$name_${lang}`,desc:`$desc_${lang}`,address:`$address_${lang}`,  dean:1})
                .populate("dean",["-__v","-departmentId"])
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

    async list(req:Request){
        try{
            const lang = req.params.lang as Lang["types"]
            const data = await Department.find({},{name:`$name_${lang}`,desc:`$desc_${lang}`,address:`$address_${lang}`,  dean:1})
                .populate("dean",["-__v","-departmentId"])
            if(!data)
                return ResponseService.notFound()
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }
}
export default DepartmentService;