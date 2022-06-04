import {Document} from "mongoose"
export interface ResourcesListQuery{
    page?:number,
    categoryId?:Document["_id"],
    title?:string
}