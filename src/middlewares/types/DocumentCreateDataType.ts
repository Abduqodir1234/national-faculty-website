import {DepartmentsDocument} from "../../models/deparments";

export interface DocumentCreateDataType{
    data:DepartmentsDocument,
    error:boolean,
    status:number,
    message:any
}