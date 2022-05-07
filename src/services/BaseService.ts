import {Document, Model} from "mongoose"
import {ObjectId} from "mongodb";
import ResponseService from "./response";
class BaseService{
    model:Model<Document>
    constructor(model:Model<Document>){
        this.model = model
    }

    async exist_or_create<filter,create>(data_filter:filter,data_create:create){
        try{
            const exist = await this.model.exists(data_filter)
            if(exist) return ResponseService.badRequest(`Data exists with ${Object.keys(data_filter)}`)
            await this.model.create(data_create)
            return ResponseService.created()
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

    async exist_sameData_or_create<T>(data:T){
        try{
            const exist = await this.model.exists(data)
            if(exist) return ResponseService.badRequest(`Data exists with ${Object.keys(data)}`)
            await this.model.create(data)
            return ResponseService.created()
        } catch(e){
            return ResponseService.internalServerError(e)
        }
    }

    async createElement<T>(data:T){
        try{
            await this.model.create(data)
            return ResponseService.created()
        } catch (e) {
            return ResponseService.internalServerError(e)
        }
    }


    async updatebyId<T>(id:Document["_id"],data:T){
        try {
            const res = await this.model.findByIdAndUpdate(new ObjectId(id), data)
            if (!res) return ResponseService.notFound()
            return ResponseService.updated()
        } catch (e) {
            return ResponseService.internalServerError(e)
        }
    }

    async deleteById(id:Document["_id"]){
        try{
            const res =  await this.model.findByIdAndDelete(new ObjectId(id))
            if(!res) return ResponseService.notFound()
            return ResponseService.deleted()
        } catch (e) {
            return ResponseService.internalServerError(e)
        }
    }



}

export default BaseService