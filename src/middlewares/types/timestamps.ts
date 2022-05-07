import {Document} from "mongoose"
export interface DocumentWithTimestamps extends Document{
    created_at:string,
    updated_at:string,
}