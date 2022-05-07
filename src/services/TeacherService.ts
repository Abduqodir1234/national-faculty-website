import BaseService from "./BaseService";
import Teachers, {TeacherDocument} from "../models/teacher";
import {ObjectId} from "mongodb";
import ResponseService from "./response";

class TeacherService extends BaseService{
    constructor() {
        super(Teachers);
    }

    async create(data:any){
        return await this.createElement(data)
    }


    async list(page:number,limit:number) {
        try{
            const data = await Teachers.aggregate([
                { '$facet': {
                        metadata: [ { $count: "total" }, { $addFields: { page: page }},{$addFields: {limit}} ],
                        teachers: [ { $skip: (page-1)*limit }, { $limit: limit },{$unset:["__v"]},]
                    } }
            ])
            return ResponseService.responseOK("",data)
        } catch (e) {
            return ResponseService.internalServerError(e)
        }
    }


    async getById(id:TeacherDocument["_id"]){
        try{
            const data = await Teachers.findById(new ObjectId(id))
                .select("-__v")
                .populate("departmentId","name -_id")
            if(!data) return ResponseService.notFound()
            return ResponseService.responseWithData(data)

        } catch (e) {
            return ResponseService.internalServerError(e)
        }
    }


}
export default TeacherService