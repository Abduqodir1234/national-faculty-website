import { Request } from "express";
import { Lang } from "../middlewares/types/LangTypes";
import MainInfos from "../models/main";
import BaseService from "./BaseService";
import ResponseService from "./response";
import {Document} from "mongoose" 
import {ObjectId} from "mongodb"
import { RequestWithUser } from "../middlewares/types/RequestWithUser";
class MainInfosService extends BaseService{
    constructor(){
        super(MainInfos)
    }

    async createOnlyOneData<T>(data:T){
        try{
            if((await MainInfos.find()).length >= 1)
                return ResponseService.badRequest("Data exists")
            await MainInfos.create(data)
            return ResponseService.created()
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }


    async get(req:Request){
        try{
            const {lang} = req.params as {lang:Lang["types"]}
            const data = await MainInfos.findOne(
                {},
                {"address":`$address_${lang}`,
                img:"$img",email:"$email",
                phoneNumber:"$phoneNumber",
                coordinate_x:"$coordinate_x",
                coordinate_y:"$coordinate_y",
                facebook:"$facebook",
                telegram:"$telegram",
                instagram:"$instagram",
                youtube:"$youtube",
                startWork:"$startWork",
                endWork:"$endWork",
            }
            )
            return ResponseService.responseWithData(data)
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

    async updateOneData(req:RequestWithUser){
        try {
            const res = await MainInfos.updateOne({}, req.body2?.body)
            if (res.matchedCount === 0) return ResponseService.notFound()
            return ResponseService.updated()
        } catch (e) {
            return ResponseService.internalServerError(e)
        }
    }
}

export default MainInfosService