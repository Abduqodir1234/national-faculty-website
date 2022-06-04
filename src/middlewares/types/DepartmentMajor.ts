import {Document} from "mongoose"
export interface DepartmentMajorsData{
    majorId:Document["_id"];
    degree: "bachelor" | "master" | "doctoral";
    departmentId:Document["_id"];
    code:string
}

export interface DepartmentMajorListQueryProps{
    page?:number;
    departmentId?:Document["_id"];
    majorId?:Document["_id"];
    code:string
}
