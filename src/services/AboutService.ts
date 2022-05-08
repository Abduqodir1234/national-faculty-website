import { Request } from "express";
import { RequestWithUser } from "../middlewares/types/RequestWithUser";
import About from "../models/about";
import BaseService from "./BaseService";
import ResponseService from "./response";

class AboutService extends BaseService{
    constructor(){
        super(About);
    }

    async createOnlyOneData<T>(data:T){
        try{
            if((await About.find()).length >= 1)
                return ResponseService.badRequest("Data exists")
            await About.create(data)
            return ResponseService.created()
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

    async updateFirstElement(req:RequestWithUser){
        try{
            await About.updateMany({},req.body2?.body)
            return ResponseService.updated()
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

    async get(req:Request){
        try{
            const data = await About.findOne({},{desc:`$desc_${req.params.lang}`})
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }
}
export default AboutService;