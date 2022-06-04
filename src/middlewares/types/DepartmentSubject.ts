import {Document} from "mongoose"

export interface DepartmentSubjectCreate{
    departmentId:string;
    subjectId:string;
    degree:string;
}

export interface DepartmentSubjectNameTypes{
    name_ru?:string;
    name_uz?:string;
    name_en?:string;
}

export interface DepartmentSubjectListQueryTypes{
    subjectId?:Document["_id"],
    departmentId?:Document["_id"],
    page:number;
}