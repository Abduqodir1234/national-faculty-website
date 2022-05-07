import {Document} from "mongoose";

function translatesGenerator<T>(table_name:string,values:T[],itemId:Document["_id"],lang:"uz" | "ru" | "en") {
    return values.map((one)=> {
         return {table_name,
            field_name:Object.keys(one)[0] ,
            itemId,
            lang,
            value:Object.values(one)[0]
        }
    })
}
export default translatesGenerator;